from datetime import datetime

import pandas as pd
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.utils.datastructures import MultiValueDictKeyError
from django.utils.decorators import method_decorator
from django.views import View

from scripts.decorators import login_required
from scripts.err_handling import check_invalid_db_ref
from utility.models import FortisBillField
from utility.serializers import FortisBillFieldSerializer


@method_decorator(login_required, name='dispatch')
class FortisBill(View):
    def get(self, request, pk=0):
        uid = request.user.id
        response = {}
        status = 500

        # If GET request is for a specific record
        if pk != 0:
            instance = FortisBillField.objects.filter(id=pk).first()

            # check the validity of the db reference obtained, if invalid, return the error
            err = check_invalid_db_ref(instance, uid)
            if err:
                return err

            response = FortisBillFieldSerializer(instance).data
            status = 200
        else:
            fortis_refs = list(FortisBillField.objects.filter(user_id=uid))
            response = [FortisBillFieldSerializer(i).data for i in fortis_refs]
            status = 200

        return JsonResponse(response, safe=False, status=status)

    def post(self, request):
        uid = request.user.id
        response = []
        status = 500
        try:
            file = request.FILES['fortis']
        except MultiValueDictKeyError:
            response = {'error': 'Unexpected key, expected "fortis"'}
            status = 400
        else:
            response = self._process_fortis(file, uid)
            status = 200
        return JsonResponse(response, safe=False, status=status)

    @classmethod
    def _process_fortis(cls, file, uid):
        """
        Private method to process csv file that contains Fortis BC consumption details
        :param file: csv file sent by the user
        :param uid: id of the user sending the file
        :return: response: JsonResponse, status: int
        """
        data = pd.read_csv(file)
        # List of extracted info as json to send back as response
        response = []

        for i, row in data.iterrows():
            # Get a reference to the user
            user_entry = User.objects.get(id=uid)

            # Extract the useful info from the csv row
            s_date = row['Bill from date']
            start_date = datetime.strptime(s_date, " %d/%m/%Y").date()
            e_date = row['Bill to date']
            end_date = datetime.strptime(e_date, " %d/%m/%Y").date()
            num_days = row['# of days']
            consumption = row['Billed GJ']
            avg_temp = row['Average temperature']

            # Push the row to the db if it doesnt already exist
            new_entry, created = FortisBillField.objects.get_or_create(user_id=user_entry, start_date=start_date,
                                                                       end_date=end_date, num_days=num_days,
                                                                       consumption=consumption, avg_temp=avg_temp)
            if created:
                new_entry.save()
                # append a dict to the list to send response back
                response.append(FortisBillFieldSerializer(new_entry).data)

        return response

    def delete(self, request, pk):
        uid = request.user.id
        instance = FortisBillField.objects.filter(id=pk).first()

        # check the validity of the db reference obtained, if invalid, return the error
        err = check_invalid_db_ref(instance, uid)
        if err:
            return err

        instance.delete()
        return JsonResponse({}, safe=False, status=200)
