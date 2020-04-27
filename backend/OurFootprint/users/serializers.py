from rest_framework import serializers
from .models import User


# Serializer to handle conversions between JSON and Python objects and vice versa
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'name', 'footprint')
