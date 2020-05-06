import pandas as pd
import numpy as np
import json


def update_json():
    """
    Update the cars_names.json based on new csv file already downloaded into static/json_files/car_names.json
    """
    # complete dataset
    data = pd.read_csv('../static/csv_files/vehicles.csv', usecols=['make', 'model', 'year', 'trany'])

    # Strip the specifications for Automatic transmission
    data['trany'] = data['trany'].str.replace('^Automatic.*', 'Automatic')

    # get unique vehicles
    unique_data = data.drop_duplicates(subset=['make', 'model'])

    # make a new column 'transmission' and fill with empty lists
    unique_data = unique_data.assign(transmission=np.empty((len(unique_data), 0)).tolist())

    # fill out the empty 'years' lists
    _get_years(unique_data, data)

    # make a new column 'name' and fill with concatenated make and model names
    unique_data['name'] = unique_data['make'] + ' ' + unique_data['model']

    # delete columns that are no longer useful
    del unique_data['make']
    del unique_data['model']
    del unique_data['year']
    del unique_data['trany']

    # convert the dataframe to a dictionary and write to a file
    d = unique_data.to_dict('records')
    _write_to_file(d)


def _get_years(unique_data, data):
    """
    For each vehicle, get a list of the years and add it in the dataframe
    :param unique_data: Dataframe containing only one entry for each make-model pair
    :param data: the complete dataset obtained from fueleconomy.gov
    """
    for i, row in unique_data.iterrows():
        # get all the entries with the same model-make pair as the current row
        valid = data[(data['model'] == row['model']) & (data['make'] == row['make'])]

        # Extract the corresponding years and drop duplicates
        years = valid['year'].drop_duplicates()

        years_trans = {}

        # for each year, find valid transmission types and put them all in a single dict
        for j in years:
            valid_trans_values = valid[valid['year'] == j]['trany']
            years_trans[j] = valid_trans_values.drop_duplicates().to_numpy().tolist()

        # assign the dictionary to the 'transmission' cell of the current row
        unique_data.at[i, 'transmission'] = years_trans


def _write_to_file(vehicles):
    """
    Write the dictionary 'vehicles' to a json file
    :param vehicles: Dict
    """
    with open('../static/json_files/vehicles.json', 'w') as file:
        file.write(json.dumps(vehicles))


# Only to be called when manually populating the json
if __name__ == '__main__':
    update_json()
