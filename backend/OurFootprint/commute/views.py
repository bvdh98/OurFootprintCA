import json

from django.contrib.auth.models import User
from django.http import JsonResponse
from django.utils.decorators import method_decorator
from django.views import View

from commute.models import UserCommute, Commute
from commute.serializers import CommuteSerializer

from scripts.decorators import login_required
from scripts.err_handling import check_invalid_db_ref


@method_decorator(login_required, name='dispatch')
class CommuteView(View):
    def get(self, request, pk=0):
        uid = request.user.id
        response = []

        # If GET request is for a specific record
        if pk != 0:
            # Get a reference to the User-Commute bridge table
            user_commute_ref = UserCommute.objects.filter(commute_id=pk).first()

            # check the validity of the db reference obtained, if invalid, return the error
            err = check_invalid_db_ref(user_commute_ref, uid)
            if err:
                return err

            # Get a commute object and serialize it
            instance = Commute.objects.get(commute_id=pk)
            response = CommuteSerializer(instance).data
        else:
            # Get all references from User-Commute bridge table
            user_commute_refs = UserCommute.objects.filter(user_id=uid)

            # get all the corresponding commutes and serialize them
            commute_refs = list(Commute.objects.filter(commute_id__in=user_commute_refs))
            response = [CommuteSerializer(i).data for i in commute_refs]

        return JsonResponse(response, safe=False, status=200)

    def post(self, request):
        uid = request.user.id

        commute = json.loads(request.body)
        user_ref = User.objects.get(id=uid)

        try:
            # Extract the useful info from the json
            vehicle = commute.get('vehicle')
            year = commute.get('year')
            transmission = commute.get('transmission')
            distance = commute.get('distance')
            highway_perc = commute.get('highway_perc')

        except KeyError:
            return JsonResponse({"error": "Invalid request body"}, status=400)

        # Create a reference to the user-commute bridge
        user_commute_entry = UserCommute(user_id=user_ref)
        user_commute_entry.save()

        # Add entry to commute table using the bridge reference
        commute_entry = Commute(commute_id=user_commute_entry, vehicle=vehicle, year=year,
                                transmission=transmission, distance=distance, highway_perc=highway_perc)

        commute_entry.save()

        return JsonResponse(CommuteSerializer(commute_entry).data, status=200)

    def delete(self, request, pk):
        uid = request.user.id

        user_commute_ref = UserCommute.objects.filter(commute_id=pk).first()

        # check the validity of the db reference obtained, if invalid, return the error
        err = check_invalid_db_ref(user_commute_ref, uid)
        if err:
            return err

        instance = Commute.objects.get(commute_id=pk)
        instance.delete()
        JsonResponse({}, status=200)
