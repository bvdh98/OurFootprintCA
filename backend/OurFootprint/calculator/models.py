from django.db import models


class User(models.Model):
    """
    The main user table to map everything else
    """
    id = models.PositiveIntegerField(primary_key=True)
    num_people_household = models.PositiveSmallIntegerField()


class UserCommute(models.Model):
    """
    Bridge between user ad commute.
    """
    commute_id = models.AutoField(primary_key=True)
    user_id = models.ForeignKey(User.id, on_delete=models.CASCADE)


class Commute(models.Model):
    """
    Store users' commutes
    """
    commute_id = models.ForeignKey(UserCommute.commute_id, primary_key=True, on_delete=models.CASCADE)
    car = models.TextField()
    transmission = models.TextField()
    distance = models.FloatField()
    city_perc = models.FloatField()


class FortisBillField(models.Model):
    """
    Each entry in this table corresponds to an entry in users' Fortis bill.
    """
    user_id = models.ForeignKey(User.id, on_delete=models.CASCADE)
    start_date = models.DateField()
    end_date = models.DateField()
    num_days = models.SmallIntegerField()
    consumption = models.FloatField()
    avg_temp = models.FloatField()


class HydroBillField(models.Model):
    """
    Each entry in this table corresponds to an entry in users' Fortis bill.
    """
    user_id = models.ForeignKey(User.id, on_delete=models.CASCADE)
    start_date = models.DateField()
    num_days = models.SmallIntegerField()
    city = models.TextField()


class UserEmissions(models.Model):
    """
    Store the users' emissions fo reach month that we have visibility on
    """
    user_id = models.ForeignKey(User.id, on_delete=models.CASCADE)
    start_date = models.DateField()
    end_date = models.DateField()
    emission = models.FloatField()
