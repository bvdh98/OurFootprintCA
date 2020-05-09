from calculator.models import User, UserCommute, Commute


def add_commute_to_db(commute, uid):
    user_entry, created = User.objects.get_or_create(id=uid, num_people_household=1)
    if created:
        user_entry.save()

    vehicle = commute.get('vehicle')
    year = commute.get('year')
    transmission = commute.get('transmission')
    distance = commute.get('distance')
    city_perc = commute.get('city_perc')

    user_commute_entry = UserCommute(user_id=user_entry)
    user_commute_entry.save()

    commute_entry = Commute(commute_id=user_commute_entry, car=vehicle, car_year=year, transmission=transmission,
                            distance=distance, city_perc=city_perc)
    commute_entry.save()
