from rest_framework import serializers
from calculator.models import FortisBillField, HydroBillField, Commute


class FortisBillFieldSerializer(serializers.ModelSerializer):
    class Meta:
        model = FortisBillField
        fields = ('start_date', 'end_date', 'num_days', 'consumption')


class HydroBillFieldSerializer(serializers.ModelSerializer):
    class Meta:
        model = HydroBillField
        fields = ('start_date', 'num_days', 'consumption')


class CommuteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Commute
        fields = ('vehicle', 'vehicle_year', 'transmission', 'distance')
