from numpy import double
from vehicle.models import Vehicles
from commute.models import Commute

# These constants are officially provided by fortis bc and bc hydro and are only specific to these companies
# Ratio of kg of carbon edited per unit of energy used
EMISSION_FACTOR_FORTIS = 0.719  # kg of carbon/kJ
EMISSION_FACTOR_HYDRO = 0.010670  # kg of carbon/kWh

# Other useful constants
MILE_TO_KM_RATIO = 1.609
GALLON_TO_LITRES_RATIO = 3.785
HUNDRED_MILES_TO_1_KM_RATIO = 160.934
EMISSION_FACTOR_FUEL_PRODUCTION = 0.43
METRIC_TONNE_TO_KG_RATIO = 1000
DAYS_IN_MONTH = 30.4375  # average number of days in a month


def hydro_calculations(consumption):
    """
    Calculate the total_footprint generated from the hydro bill
    :param consumption: This is the consumption value from the hydro bill (unit: kWh)
    :return carbon_footprint: This is the total footprint from the hydro bill (unit: metric tonnes of carbon)
    """
    carbon_footprint = (consumption * EMISSION_FACTOR_HYDRO) / METRIC_TONNE_TO_KG_RATIO  # convert to metric tonnes
    return carbon_footprint  # Metric tonnes


def fortis_calculations(consumption):
    """
    Calculate the total_footprint generated from the fortis bill
    :param consumption: This is the consumption value from the fortis bill (unit: kJ)
    :return carbon_footprint: This is the total footprint from the fortis bill (unit: metric tonnes of carbon)
    """
    carbon_footprint = consumption * EMISSION_FACTOR_FORTIS / METRIC_TONNE_TO_KG_RATIO  # convert to metric tonnes
    return carbon_footprint  # Metric tonnes


def calculate_commute_emissions(commute: Commute):
    """
    Calculate carbon footprint for a commute
    :param commute: a Commute entry from the database
    :return: Total monthly carbon footprint for the commute  (unit: metric tonnes of carbon)
    """
    # get the vehicle(s) from the database that match the specifications of the user's vehicle
    matching_vehicles = list(Vehicles.objects.all().filter(name=commute.vehicle, year=commute.year,
                                                           trany=commute.transmission).values())

    # get the first vehicle and see if it is an electric vehicle
    # a vehicle is electric if the value of cityE is not 0
    if matching_vehicles[0]['cityE'] != 0:
        emission_info = get_info_electric(matching_vehicles)
        return calculate_footprint_electric(commute, **emission_info)
    else:
        emission_info = get_info_gasoline(matching_vehicles)
        return calculate_footprint_gasoline(commute, **emission_info)


def get_info_gasoline(matching_vehicles):
    """
    Return the info required to calculate carbon footprint of a car that runs on gasoline or any non electric fuel
    :param matching_vehicles: a list of vehicles from the database that match the description of user's vehicle
    """
    return {'emissions': property_mean(matching_vehicles, 'co2TailpipeGpm'),
            'city_fuel_eff': property_mean(matching_vehicles, 'city08'),
            'highway_fuel_eff': property_mean(matching_vehicles, 'highway08')}


def get_info_electric(matching_rows):
    """
    Return the info required to calculate carbon footprint of a car that runs on electricity
    :param matching_rows: a list of vehicles from the database that match the description of user's vehicle
    """
    return {'city_fuel_eff': property_mean(matching_rows, 'cityE'),
            'highway_fuel_eff': property_mean(matching_rows, 'highwayE')}


def property_mean(lst, key):
    """
    Find the mean of a particular property in a list of dicts
    :param lst: the list of dicts
    :param key: the property whose mean is needed
    """
    return float(sum(d[key] for d in lst)) / len(lst)


def calculate_footprint_gasoline(commute: Commute, city_fuel_eff, highway_fuel_eff, emissions) -> double:
    """
    Calculate carbon footprint for a gasoline based/ non electric vehicle
    :param commute: Commute object to access details about user's commute
    :param city_fuel_eff: fuel efficiency of the vehicle in the city  (unit: miles per gallon)
    :param highway_fuel_eff: fuel efficiency of the vehicle in the highway  (unit: miles per gallon)
    :param emissions: Total carbon emissions by the vehicle for the monthly commute  (unit: metric tonnes of carbon)
    """
    distance = commute.distance
    highway_percentage = commute.highway_perc
    # converting city  fuel efficiency to km per litres
    converted_city_fuel_eff = (city_fuel_eff * MILE_TO_KM_RATIO) / GALLON_TO_LITRES_RATIO

    # calculating highway distance
    highway_distance = highway_percentage * distance
    # calculating highway fuel
    highway_fuel = highway_distance / ((highway_fuel_eff * MILE_TO_KM_RATIO) / GALLON_TO_LITRES_RATIO)
    # calculating city distance
    city_distance = distance - highway_distance
    # calculating city fuel
    city_fuel = city_distance / converted_city_fuel_eff
    # converting emissions to KGco2 per km
    common_emm = emissions / (MILE_TO_KM_RATIO * METRIC_TONNE_TO_KG_RATIO)
    # calculating footprint for  decomposition city
    fuel_decomposition_city = common_emm * city_distance
    # calculating footprint for  decomposition highway
    fuel_decomposition_highway = highway_distance * common_emm
    # calculating footprint for  fuel production city
    fuel_production_city = city_fuel * EMISSION_FACTOR_FUEL_PRODUCTION
    # calculating footprint for  fuel production city
    fuel_production_highway = highway_fuel * EMISSION_FACTOR_FUEL_PRODUCTION
    # calculating total footprint for the commute
    total_footprint = (fuel_decomposition_city + fuel_production_city + fuel_decomposition_highway
                       + fuel_production_highway) / METRIC_TONNE_TO_KG_RATIO  # in metric tonnes

    # convert weekly footprint to monthly
    monthly_footprint = (total_footprint / 7) * DAYS_IN_MONTH

    return monthly_footprint  # metric tonnes of carbon emission per month


def calculate_footprint_electric(commute: Commute, city_fuel_eff, highway_fuel_eff) -> double:
    """
    Calculate carbon footprint for an electric vehicle
    :param commute: Commute object to access details about user's commute
    :param city_fuel_eff: fuel efficiency of the vehicle in the city  (unit: kWh per 100 miles)
    :param highway_fuel_eff: fuel efficiency of the vehicle in the highway  (unit: kWh per 100 miles)
    """
    distance = commute.distance
    highway_percentage = commute.highway_perc

    # converting the city and highway data into proper units
    converted_city_kwh = city_fuel_eff / HUNDRED_MILES_TO_1_KM_RATIO
    converted_highway_kwh = highway_fuel_eff / HUNDRED_MILES_TO_1_KM_RATIO

    # calculating highway distance
    highway_distance = highway_percentage * distance
    # calculating city distance
    city_distance = distance - highway_distance
    # calculating city kwh
    total_city_kwh = converted_city_kwh * city_distance
    # calculating highway kwh
    total_highway_kwh = converted_highway_kwh * highway_distance
    total_kwh = total_city_kwh + total_highway_kwh
    total_footprint = (total_kwh * EMISSION_FACTOR_HYDRO) / METRIC_TONNE_TO_KG_RATIO  # metric tonnes

    # convert weekly footprint to monthly
    monthly_footprint = (total_footprint / 7) * DAYS_IN_MONTH

    return monthly_footprint  # metric tonnes of carbon emission per month
