from django.contrib.auth.models import User
from django.db import models


class UserCommute(models.Model):
    """
    Bridge between user ad commute.
    """
    commute_id = models.AutoField(primary_key=True)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)


class Commute(models.Model):
    """
    Store users' commutes
    """
    commute_id = models.OneToOneField(UserCommute, primary_key=True, on_delete=models.CASCADE)
    vehicle = models.TextField()
    year = models.IntegerField()
    transmission = models.TextField()
    distance = models.FloatField()
    highway_perc = models.FloatField()
