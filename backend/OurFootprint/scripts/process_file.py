import pandas as pd
from calculator.models import FortisBillField


def process_fortis(file):
    data = pd.read_csv(file)
    consumption = []

    for i, row in data.iterrows():
        consumption.append(row['Billed GJ'])
        new_entry = FortisBillField()
