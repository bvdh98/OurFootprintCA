from rest_framework import serializers
from calculator.models import Commute


class CommuteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Commute
        fields = ('commute_id', 'vehicle', 'vehicle_year', 'transmission', 'distance')
