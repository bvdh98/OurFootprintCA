import json

import pandas as pd

cols = ['make', 'model', 'year', 'trany', 'charge120', 'charge240', 'city08', 'cityE', 'combE', 'feScore', 'fuelCost08',
        'ghgScore', 'highway08', 'highwayE', 'UCity', 'youSaveSpend']

data = pd.read_csv('../static/csv_files/vehicles.csv', usecols=cols)

# Remove suffix from Automatic
data['trany'] = data['trany'].str.replace('^Automatic.*', 'Automatic')

# Replace make-model pairs with name
data['name'] = data['make'] + ' ' + data['model']
del data['make']
del data['model']

d = []

for i, row in data.iterrows():
    d2 = {"model": 'vehicle.Vehicles', "pk": i}
    d3 = row.to_dict()
    d2['fields'] = d3
    d.append(d2)

with open('../static/json_files/all_vehicles.json', 'w') as file:
    file.write(json.dumps(d))
