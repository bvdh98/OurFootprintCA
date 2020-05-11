from numpy import double
from vehicle.models import Vehicles


def hydro_calculations(bill_entries):
    total_kwh = sum(bill_entries)
    emission_factor = 0.010670
    carbon_footprint = (total_kwh * emission_factor) / 1000  # in tonnes
    return carbon_footprint


def fortis_calculations(bill_entries):
    total_kj = sum(bill_entries)
    emission_factor = 0.719
    carbon_footprint = total_kj * emission_factor
    return carbon_footprint


class CarbonCalculations:
    def __init__(self, city_emissions=0, city_fuel_eff=0, highway_eff=0, cityE=0, highwayE=0):
        self.city_emissions = city_emissions
        self.city_fuel_eff = city_fuel_eff
        self.highway_fuel_eff = highway_eff
        self.city_electric_vehicle_kwh = cityE
        self.highway_electric_vehicle_kwh = highwayE

    def get_emission_efficiency(self, name, year, trany):
        required_rows = list(Vehicles.objects.all().filter(name=name, year=year, trany=trany).values())
        self.city_emissions = self._mean(required_rows, 'co2TailpipeGpm')
        self.city_fuel_eff = self._mean(required_rows, 'city08')
        self.highway_fuel_eff = self._mean(required_rows, 'highway08')

        return self.city_emissions, self.city_fuel_eff, self.highway_fuel_eff,

    def get_electric_vehicle_kwh(self, name, year, trany):
        required_rows = list(Vehicles.objects.all().filter(name=name, year=year, trany=trany).values())
        self.city_electric_vehicle_kwh = self._mean(required_rows, 'cityE')
        self.highway_electric_vehicle_kwh = self._mean(required_rows, 'highwayE')
        return self.city_electric_vehicle_kwh, self.highway_electric_vehicle_kwh

    @classmethod
    def _mean(cls, lst, key):
        """
        Find the mean of a particular property in a list of dicts
        :param lst: the list of dicts
        :param key: the property whose mean is needed
        """
        return float(sum(d[key] for d in lst)) / len(lst)

    def calculate_footprint_transport(self, no_of_trips, distance, highway_percentage) -> double:
        # converting city  fuel efficiency to km per litres
        converted_city_fuel_eff = (self.city_fuel_eff * 1.609) / 3.785
        # getting total distance
        total_distance = distance * no_of_trips
        # calculating highway distance
        highway_distance = (highway_percentage / 100) * total_distance
        # calculating highway fuel
        highway_fuel = highway_distance / ((self.highway_fuel_eff * 1.609) / 3.785)
        # calculating city distance
        city_distance = total_distance - highway_distance
        # calculating city fuel
        city_fuel = city_distance / converted_city_fuel_eff
        # converting emissions to KGco2 per km
        common_emm = self.city_emissions / (1.60934 * 1000)
        # calculating footprint for  decomposition city
        fuel_decomposition_city = common_emm * city_distance
        # calculating footprint for  decomposition highway
        fuel_decomposition_highway = highway_distance * common_emm
        # calculating footprint for  fuel production city
        fuel_production_city = city_fuel * 0.43
        # calculating footprint for  fuel production city
        fuel_production_highway = highway_fuel * 0.43
        # calculating total footprint for the commute
        total_footprint = (fuel_decomposition_city + fuel_production_city + fuel_decomposition_highway
                           + fuel_production_highway) / 1000  # in tonnes
        print(total_footprint)
        return total_footprint

    def electric_vehicles_footprint(self, distance, no_of_trips, highway_percentage):
        # converting the city and highway data into proper units
        converted_city_kwh = self.city_electric_vehicle_kwh / 160.934
        converted_highway_kwh = self.highway_electric_vehicle_kwh / 160.934
        # calculating total distance
        total_distance = distance * no_of_trips
        # calculating highway distance
        highway_distance = (highway_percentage / 100) * total_distance
        # calculating city distance
        city_distance = total_distance - highway_distance
        # calculating city kwh
        total_city_kwh = converted_city_kwh * city_distance
        # calculating highway kwh
        total_highway_kwh = converted_highway_kwh * highway_distance
        total_kwh = total_city_kwh + total_highway_kwh
        emission_factor = 0.010670
        total_footprint = (total_kwh * emission_factor) / 1000  # tonnes
        return total_footprint

