from calendar import monthrange
from datetime import datetime

import pandas as pd
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.utils.datastructures import MultiValueDictKeyError
from django.utils.decorators import method_decorator
from django.views import View

from scripts.decorators import login_required
from scripts.err_handling import check_invalid_db_ref
from utility.models import HydroBillField
from utility.serializers import HydroBillFieldSerializer


@method_decorator(login_required, name='dispatch')
class HydroBill(View):
    def get(self, request, pk=0):
        uid = request.user.id
        response = {}
        status = 500

        # If GET request is for a specific record
        if pk != 0:
            instance = HydroBillField.objects.filter(id=pk).first()
            # check the validity of the db reference obtained, if invalid, return the error
            err = check_invalid_db_ref(instance, uid)
            if err:
                return err

            response = HydroBillFieldSerializer(instance).data
            status = 200
        else:
            hydro_refs = list(HydroBillField.objects.filter(user_id=uid))
            response = [HydroBillFieldSerializer(i).data for i in hydro_refs]
            status = 200

        return JsonResponse(response, safe=False, status=status)

    def post(self, request):
        uid = request.user.id
        response = []
        status = 500
        try:
            file = request.FILES['hydro']
        except MultiValueDictKeyError:
            response = {'error': 'Unexpected key, expected "hydro"'}
            status = 400
        else:
            response, status = self._process_hydro(file, uid)

        return JsonResponse(response, safe=False, status=status)

    @classmethod
    def _process_hydro(cls, file, uid):
        """
        Private method to process csv file that contains BC Hydro consumption details
        :param file: csv file sent by the user
        :param uid: id of the user sending the file
        :return: response: JsonResponse, status: int
        """
        data = pd.read_csv(file)
        # List of extracted info as json to send back as response
        response = []

        for i, row in data.iterrows():
            # Get a reference to the user
            user_ref = User.objects.get(id=uid)

            try:
                # Extract the useful info from the csv row
                s_date = row['Interval Start Date/Time']
                start_date = datetime.strptime(s_date, "%Y-%m-%d").date()
                num_days = monthrange(start_date.year, start_date.month)[1] - start_date.day + 1
                consumption = row['Net Consumption (kWh)']
                city = row['City']

            except KeyError:
                return {"error": "Invalid file"}, 422

            # Push the row to the db if it doesnt already exist
            new_entry, created = HydroBillField.objects.get_or_create(user_id=user_ref, start_date=start_date,
                                                                      num_days=num_days, consumption=consumption,
                                                                      city=city)
            if created:
                new_entry.save()
                # append a dict to the list to send response back
                response.append(HydroBillFieldSerializer(new_entry).data)

        return response, 200

    def delete(self, request, pk):
        uid = request.user.id
        instance = HydroBillField.objects.filter(id=pk).first()

        # check the validity of the db reference obtained, if invalid, return the error
        err = check_invalid_db_ref(instance, uid)
        if err:
            return err

        instance.delete()
        return JsonResponse({}, safe=False, status=200)
