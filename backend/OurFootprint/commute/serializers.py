from rest_framework import serializers

from commute.models import Commute


class CommuteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Commute
        fields = ('commute_id', 'vehicle', 'year', 'transmission', 'distance', 'highway_perc')
