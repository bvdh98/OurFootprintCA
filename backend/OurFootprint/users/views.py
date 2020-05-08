from django.shortcuts import render
from rest_framework import viewsets
from .models import SampleUser
from .serializers import UserSerializer


# get a nice django generated html to test the api
class UserView(viewsets.ModelViewSet):
    queryset = SampleUser.objects.all()
    serializer_class = UserSerializer
