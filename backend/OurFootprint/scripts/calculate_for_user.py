from calculator.models import FortisBillField, HydroBillField, UserCommute, Commute, UserEmissions


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
    user_transport_footprint = sum([calculate_commute_footprint(commute) for commute in commute_refs])

    total_monthly_footprint = user_fortis_footprint + user_hydro_footprint + user_transport_footprint

    fortis_start_date = get_min_start_date(fortis_ref)
    hydro_start_date = get_min_start_date(fortis_ref)

    fortis_end_date = get_max_end_date(fortis_ref)
    hydro_end_date = get_max_end_date(hydro_ref)

    start_date = max(fortis_start_date, hydro_start_date)
    end_date = min(fortis_end_date, hydro_end_date)

    emission_entry = UserEmissions.objects.get(user_id=uid)

    emission_entry.start_date = start_date
    emission_entry.end_date = end_date
    emission_entry.emission = total_monthly_footprint

    emission_entry.save()


def get_min_start_date(bills):
    start_dates = [bill.start_date for bill in bills]
    return min(start_dates)


def get_max_end_date(bills):
    start_dates = [bill.end_date for bill in bills]
    return max(start_dates)
