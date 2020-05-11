from rest_framework import serializers
from .models import SampleUser


# Serializer to handle conversions between JSON and Python objects and vice versa
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = SampleUser
        fields = ('id', 'name', 'footprint')
