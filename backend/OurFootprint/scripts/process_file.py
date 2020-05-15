from datetime import datetime
from calendar import monthrange
import pandas as pd
from calculator.models import FortisBillField, User, HydroBillField
from calculator.serializers import FortisBillFieldSerializer, HydroBillFieldSerializer


def process_fortis(file, uid):
    data = pd.read_csv(file)
    # List of extracted info as json to send back as response
    response = []

    for i, row in data.iterrows():
        # Get a reference to the user (create the user if doesnt exist)
        # TODO: change num_people_household
        user_entry, created = User.objects.get_or_create(id=uid, num_people_household=1)
        if created:
            user_entry.save()

        # TODO: have a 415 check? (file is not csv)
        try:
            # Extract the useful info from the csv row
            s_date = row['Bill from date']
            start_date = datetime.strptime(s_date, " %d/%m/%Y").date()
            e_date = row['Bill to date']
            end_date = datetime.strptime(e_date, " %d/%m/%Y").date()
            num_days = row['# of days']
            consumption = row['Billed GJ']
            avg_temp = row['Average temperature']

        except KeyError:
            return {"error": "Invalid file"}, 422

        # Push the row to the db if it doesnt already exist
        new_entry, created = FortisBillField.objects.get_or_create(user_id=user_entry, start_date=start_date,
                                                                   end_date=end_date, num_days=num_days,
                                                                   consumption=consumption, avg_temp=avg_temp)
        if created:
            new_entry.save()
            # append a dict to the list to send response back
            response.append(FortisBillFieldSerializer(new_entry).data)

    return response, 200


def process_hydro(file, uid):
    data = pd.read_csv(file)
    # List of extracted info as json to send back as response
    response = []

    for i, row in data.iterrows():
        # Get a reference to the user (create the user if doesnt exist)
        user_entry, created = User.objects.get_or_create(id=uid, num_people_household=1)
        if created:
            user_entry.save()

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
        new_entry, created = HydroBillField.objects.get_or_create(user_id=user_entry, start_date=start_date,
                                                                  num_days=num_days, consumption=consumption, city=city)
        if created:
            new_entry.save()
            # append a dict to the list to send response back
            response.append(HydroBillFieldSerializer(new_entry).data)

    return response, 200
