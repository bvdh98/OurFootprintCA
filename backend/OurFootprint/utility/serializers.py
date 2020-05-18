from rest_framework import serializers

from utility.models import FortisBillField, HydroBillField


class FortisBillFieldSerializer(serializers.ModelSerializer):
    class Meta:
        model = FortisBillField
        fields = ('id', 'start_date', 'end_date', 'num_days', 'consumption')


class HydroBillFieldSerializer(serializers.ModelSerializer):
    class Meta:
        model = HydroBillField
        fields = ('id', 'start_date', 'num_days', 'consumption')
