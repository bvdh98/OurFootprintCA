from calculator.models import FortisBillField, HydroBillField, UserCommute, Commute
from calculator.serializers import FortisBillFieldSerializer, HydroBillFieldSerializer, CommuteSerializer


def get_fortis(uid, fortis_id):
    # If GET request is for a specific record
    if fortis_id != 0:
        return get_fortis_with_id(uid, fortis_id)

    fortis_refs = list(FortisBillField.objects.filter(user_id=uid))
    return [FortisBillFieldSerializer(i).data for i in fortis_refs], 200


def get_fortis_with_id(uid, fortis_id):
    instance = FortisBillField.objects.get(id=fortis_id, user_id=uid)
    if instance is not None:
        return FortisBillFieldSerializer(instance).data, 200
    else:
        return {"error": "Resource does not exist or belongs to some other user"}, 403


def get_hydro(uid, hydro_id):
    # If GET request is for a specific record
    if hydro_id != 0:
        return get_hydro_with_id(uid, hydro_id)
    hydro_refs = list(HydroBillField.objects.filter(user_id=uid))
    return [HydroBillFieldSerializer(i).data for i in hydro_refs], 200


def get_hydro_with_id(uid, hydro_id):
    instance = HydroBillField.objects.get(id=hydro_id, user_id=uid)
    if instance.user_id is not None:
        return FortisBillFieldSerializer(instance).data, 200
    else:
        return {"error": "Trying to access other users' data"}, 403


def get_commute(uid, commute_id):
    # If GET request is for a specific record
    if commute_id != 0:
        return get_commute_with_id(uid, commute_id)
    user_commute_refs = UserCommute.objects.filter(user_id=uid)
    commute_refs = list(Commute.objects.filter(commute_id__in=user_commute_refs))
    return [CommuteSerializer(i).data for i in commute_refs], 200


def get_commute_with_id(uid, commute_id):
    user_commute_ref = UserCommute.objects.get(user_id=uid, commute_id=commute_id)
    if user_commute_ref is None:
        return {"error": "Not found"}, 404

    instance = Commute.objects.get(commute_id=commute_id)
    return CommuteSerializer(instance).data, 200

