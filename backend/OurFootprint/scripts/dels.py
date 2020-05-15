from calculator.models import FortisBillField, HydroBillField, Commute, UserCommute


def del_fortis(uid, fortis_id):
    instance = FortisBillField.objects.get(id=fortis_id)
    if instance is None:
        return {"error": "Not found"}, 404
    if instance.user_id != uid:
        return {"error": "Access denied"}, 403
    instance.delete()
    return {}, 200


def del_hydro(uid, hydro_id):
    instance = HydroBillField.objects.get(id=hydro_id, user_id=uid)
    if instance is None:
        return {"error": "not found"}, 404
    if instance.user_id != uid:
        return {"error": "Access denied"}, 403
    instance.delete()
    return {}, 200


def del_commute(uid, commute_id):
    user_commute_ref = UserCommute.objects.get(user_id=uid, commute_id=commute_id)
    if user_commute_ref is None:
        return {"error": "not found"}, 404

    instance = Commute.objects.get(commute_id=commute_id)
    instance.delete()
    return {}, 200
