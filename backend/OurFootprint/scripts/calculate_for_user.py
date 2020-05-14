from calculator.models import FortisBillField, HydroBillField, UserCommute, Commute
from calculator.serializers import FortisBillFieldSerializer, HydroBillFieldSerializer, CommuteSerializer
from scripts.carbon_calculations import fortis_calculations, hydro_calculations, calculate_commute_emissions


def calculate_footprint_for_user(uid):
    """
    Take a user id, and return a detailed json object containing usage and carbon footprint data
    :param uid: The user id requesting the info
    :return: a complex object with users' carbon footprint info
    """
    # Get the necessary entries from the database for this user
    fortis_entries = list(FortisBillField.objects.filter(user_id=uid))
    hydro_entries = list(HydroBillField.objects.filter(user_id=uid))
    user_commute_entries = UserCommute.objects.filter(user_id=uid)
    commute_entries = list(Commute.objects.filter(commute_id__in=user_commute_entries))

    return compile_footprint_json(fortis_entries, hydro_entries, commute_entries)


def compile_footprint_json(fortis_entries, hydro_entries, commute_entries):
    """
    Take the necessary db entries and create a detailed object to return to frontend
    :param fortis_entries: All the fortis info that exists in the db about the user
    :param hydro_entries: All the hydro info that exists in the db about the user
    :param commute_entries: All the user's commutes that exist in the db
    :return: json with keys fortis, hydro and commute
    """
    return_json = {'fortis': [], 'hydro': [], 'commute': []}

    for entry in fortis_entries:
        # calculate the carbon footprint for this fortis entry
        footprint = fortis_calculations(entry.consumption)
        # Serialize the QuerySet object to a dict
        detailed_dict = FortisBillFieldSerializer(entry).data
        # Attach the 'footprint' to the dict
        detailed_dict['footprint'] = footprint
        # Add it to the ultimate json
        return_json['fortis'].append(detailed_dict)

    for entry in hydro_entries:
        # calculate the carbon footprint for this hydro entry
        footprint = hydro_calculations(entry.consumption)
        # Serialize the QuerySet object to a dict
        detailed_dict = HydroBillFieldSerializer(entry).data
        # Attach the 'footprint' to the dict
        detailed_dict['footprint'] = footprint
        # Add it to the ultimate json
        return_json['hydro'].append(detailed_dict)

    for commute in commute_entries:
        # calculate the carbon footprint for this hydro entry
        footprint = calculate_commute_emissions(commute)
        # Serialize the QuerySet object to a dict
        detailed_dict = CommuteSerializer(commute).data
        # Attach the 'footprint' to the dict
        detailed_dict['footprint'] = footprint
        # Add it to the ultimate json
        return_json['commute'].append(detailed_dict)

    return return_json
