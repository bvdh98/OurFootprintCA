import datetime

import pandas as pd
from calculator.models import FortisBillField, User


def process_fortis(file, uid):
    data = pd.read_csv(file)
    response = []

    for i, row in data.iterrows():
        user_entry = User(id=uid, num_people_household=1)
        user_entry.save()
        s_date = row['Bill from date']
        start_date = datetime.datetime.strptime(s_date, " %d/%m/%Y")
        e_date = row['Bill to date']
        end_date = datetime.datetime.strptime(s_date, " %d/%m/%Y")
        num_days = row['# of days']
        consumption = row['Billed GJ']
        avg_temp = row['Average temperature']
        new_entry = FortisBillField(user_id=user_entry, start_date=start_date, end_date=end_date, num_days=num_days,
                                    consumption=consumption, avg_temp=avg_temp)
        new_entry.save()
        response.append({'start_date': s_date, 'end_date': e_date, 'num_days': num_days, 'consumption': consumption,
                         'avg_temp': avg_temp})

    return response
