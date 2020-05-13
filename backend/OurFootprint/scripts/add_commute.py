from calculator.models import User, UserCommute, Commute


def add_commute_to_db(commute, uid):
    # Get a reference to the user (create the user if doesnt exist)
    user_entry, created = User.objects.get_or_create(id=uid, num_people_household=1)
    if created:
        user_entry.save()

    # Extract the useful info from the csv row
    vehicle = commute.get('vehicle')
    year = commute.get('year')
    transmission = commute.get('transmission')
    distance = commute.get('distance')
    highway_perc = commute.get('highway_perc')

    # Create a reference to the user-commute bridge
    user_commute_entry, created = UserCommute.objects.get_or_create(user_id=user_entry)
    if created:
        user_commute_entry.save()

    # Add entry to commute table using the bridge reference
    commute_entry, created = Commute.objects.get_or_create(commute_id=user_commute_entry, vehicle=vehicle,
                                                           vehicle_year=year, transmission=transmission,
                                                           distance=distance, highway_perc=highway_perc)
    if created:
        commute_entry.save()
