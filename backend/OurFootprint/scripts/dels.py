from calculator.models import FortisBillField, HydroBillField, Commute


def del_fortis(fortis_id):
    instance = FortisBillField.objects.get(id=fortis_id)
    instance.delete()


def del_hydro(hydro_id):
    instance = HydroBillField.objects.get(id=hydro_id)
    instance.delete()


def del_commute(commute_id):
    instance = Commute.objects.get(commute_id=commute_id)
    instance.delete()
