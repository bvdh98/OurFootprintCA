from calculator.models import FortisBillField, HydroBillField, UserCommute, Commute


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

    fortis_energy = [i.consumption for i in fortis_ref]
    hydro_energy = [i.consumption for i in hydro_ref]

    user_fortis_footprint = fortis_calculations(fortis_energy)
    user_hydro_footprint = hydro_calculations(hydro_energy)
    user_transport_footprint = sum([CommuteCalculator(commute).calcuate_footprint() for commute in commute_refs])

    return user_fortis_footprint + user_hydro_footprint + user_transport_footprint
