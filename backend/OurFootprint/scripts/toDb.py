import json
import pandas as pd


def update_all_vehicles_json():
    cols = ['make', 'model', 'year', 'trany', 'charge120', 'charge240', 'city08', 'cityE', 'combE', 'feScore',
            'fuelCost08', 'ghgScore', 'highway08', 'highwayE', 'co2TailpipeGpm', 'UCity', 'youSaveSpend']

    data = pd.read_csv('../static/csv_files/vehicles.csv', usecols=cols)

    # Remove suffix from Automatic
    data['trany'] = data['trany'].str.replace('^Automatic.*', 'Automatic')

    # Replace make-model pairs with name
    data['name'] = data['make'] + ' ' + data['model']
    del data['make']
    del data['model']

    data_json = []

    for i, row in data.iterrows():
        detail_keys = {"model": 'vehicle.Vehicles', "pk": i}
        body = row.to_dict()
        detail_keys['fields'] = body
        data_json.append(detail_keys)

    with open('../static/json_files/all_vehicles.json', 'w') as file:
        file.write(json.dumps(data_json))
