from calculator.models import FortisBillField, HydroBillField, UserCommute, Commute, UserEmissions
from scripts.carbon_calculations import fortis_calculations, hydro_calculations


def calculate_footprint_for_user(uid):
    """
    Take a user id, pull out all his info from the db and calculate his carbon footprint
    :param uid: The user id requesting the info
    :return: a complex object with users' carbon footprint info
    """
    fortis_ref = list(FortisBillField.objects.filter(user_id=uid))
    hydro_ref = list(HydroBillField.objects.filter(user_id=uid))
    user_commute_refs = UserCommute.objects.filter(user_id=uid)
    commute_refs = list(Commute.objects.filter(commute_id__in=user_commute_refs))

    return_json = {}

    for i in fortis_ref:
        footprint = fortis_calculations(i.consumption)
        d = str(i)
        print(d)

