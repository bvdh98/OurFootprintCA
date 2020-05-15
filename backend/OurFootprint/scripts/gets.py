from calculator.models import UserCommute, Commute
from calculator.serializers import CommuteSerializer
from utility.models import FortisBillField, HydroBillField
from utility.serializers import FortisBillFieldSerializer, HydroBillFieldSerializer


def get_fortis(uid, fortis_id):
    # If GET request is for a specific record
    if fortis_id != 0:
        return get_fortis_with_id(fortis_id)

    fortis_refs = list(FortisBillField.objects.filter(user_id=uid))
    return [FortisBillFieldSerializer(i).data for i in fortis_refs]


def get_fortis_with_id(fortis_id):
    instance = FortisBillField.objects.get(id=fortis_id)
    return FortisBillFieldSerializer(instance).data


def get_hydro(uid, hydro_id):
    # If GET request is for a specific record
    if hydro_id != 0:
        return get_hydro_with_id(hydro_id)
    hydro_refs = list(HydroBillField.objects.filter(user_id=uid))
    return [HydroBillFieldSerializer(i).data for i in hydro_refs]


def get_hydro_with_id(hydro_id):
    instance = HydroBillField.objects.get(id=hydro_id)
    return HydroBillFieldSerializer(instance).data


def get_commute(uid, commute_id):
    # If GET request is for a specific record
    if commute_id != 0:
        return get_commute_with_id(commute_id)
    user_commute_refs = UserCommute.objects.filter(user_id=uid)
    commute_refs = list(Commute.objects.filter(commute_id__in=user_commute_refs))
    return [CommuteSerializer(i).data for i in commute_refs]


def get_commute_with_id(commute_id):
    instance = Commute.objects.get(commute_id=commute_id)
    return CommuteSerializer(instance).data
