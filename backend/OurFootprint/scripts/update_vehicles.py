import pandas as pd
import numpy as np
import json


def update_json():
    """
    Update the cars_names.json based on new csv file already downloaded into static/json_files/car_names.json
    """
    # complete dataset
    data = pd.read_csv('../static/csv_files/vehicles.csv', usecols=['make', 'model', 'year'])

    # get unique vehicles
    unique_data = data.drop_duplicates(subset=['make', 'model'])

    # make a new column 'years' and fill with empty lists
    unique_data = unique_data.assign(years=np.empty((len(unique_data), 0)).tolist())

    # fill out the empty 'years' lists
    _get_years(unique_data, data)

    # make a new column 'name' and fill with concatenated make and model names
    unique_data['name'] = unique_data['make'] + ' ' + unique_data['model']

    # delete columns that are no longer useful
    del unique_data['make']
    del unique_data['model']
    del unique_data['year']

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
        # get all the entries with the same model-make pair as the current row and extract the corresponding years
        years = data[(data['model'] == row['model']) & (data['make'] == row['make'])]['year']

        # get only the unique values and assign to the 'years' cell of the current row
        years = np.unique(years.to_numpy())
        unique_data.at[i, 'years'] = years.tolist()


def _write_to_file(vehicles):
    """
    Write the dictionary 'vehicles' to a json file
    :param vehicles: Dict
    """
    with open('../static/json_files/vehicles.json', 'w') as file:
        file.write(json.dumps(vehicles))


update_json()
