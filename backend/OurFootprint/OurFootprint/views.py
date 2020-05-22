import calendar

from django.http import JsonResponse

from OurFootprint.fortis_monthly_consumption import get_monthly_entries
from commute.models import UserCommute, Commute
from commute.serializers import CommuteSerializer
from scripts.decorators import login_required
from scripts.carbon_calculations import fortis_calculations, hydro_calculations, calculate_commute_emissions
from utility.models import FortisBillField, HydroBillField
from utility.serializers import FortisBillFieldSerializer, HydroBillFieldSerializer


@login_required
def calculate_footprint(request):
    """
    Method to return user's total carbon footprint as a complex json that can be parsed by frontend
    """
    uid = request.user.id
    if uid is None:
        return JsonResponse({"error": "Not Authorized"}, status=401)
    response = calculate_footprint_for_user(uid)
    return JsonResponse(response)


def calculate_footprint_for_user(uid):
    """
    Take a user id, and return a detailed json object containing usage and carbon footprint data
    :param uid: The user id requesting the info
    :return: a complex object with users' carbon footprint info
    """
    # Get the necessary entries from the database for this user
    fortis_entries = list(FortisBillField.objects.filter(user_id=uid))
    # Extract monthly consumption data as a dict
    fortis_entries = get_monthly_entries(fortis_entries)
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

    for month, consumption in fortis_entries.items():
        # calculate the carbon footprint for this fortis entry
        footprint = fortis_calculations(consumption)
        # Construct a dict to return
        detailed_dict = {'month': month, 'consumption': consumption, 'footprint': footprint}
        # Add it to the ultimate json
        return_json['fortis'].append(detailed_dict)

    for entry in hydro_entries:
        # calculate the carbon footprint for this hydro entry
        footprint = hydro_calculations(entry.consumption)
        # Serialize the QuerySet object to a dict
        detailed_dict = HydroBillFieldSerializer(entry).data
        # Attach the 'footprint' to the dict
        detailed_dict['footprint'] = footprint
        # Add the month name
        detailed_dict['month'] = calendar.month_name[entry.start_date.month]
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

