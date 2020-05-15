from calculator.models import User, UserCommute, Commute
from calculator.serializers import CommuteSerializer


def add_commute_to_db(commute, uid):
    # Get a reference to the user (create the user if doesnt exist)
    user_entry, created = User.objects.get_or_create(id=uid, num_people_household=1)
    if created:
        user_entry.save()

    try:
        # Extract the useful info from the json
        vehicle = commute.get('vehicle')
        year = commute.get('year')
        transmission = commute.get('transmission')
        distance = commute.get('distance')
        highway_perc = commute.get('highway_perc')

    except KeyError:
        return {"error": "Invalid request body"}, 400

    # Create a reference to the user-commute bridge
    user_commute_entry = UserCommute(user_id=user_entry)
    user_commute_entry.save()

    # Add entry to commute table using the bridge reference
    commute_entry = Commute(commute_id=user_commute_entry, vehicle=vehicle, vehicle_year=year,
                            transmission=transmission, distance=distance, highway_perc=highway_perc)

    commute_entry.save()

    return CommuteSerializer(commute_entry).data, 200
