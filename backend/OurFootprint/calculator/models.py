from django.db import models


class User(models.Model):
    id = models.PositiveIntegerField(primary_key=True)
    num_people_household = models.PositiveSmallIntegerField()


class UserCommute(models.Model):
    commute_id = models.PositiveIntegerField(primary_key=True)
    user_id = models.ForeignKey(User.id, on_delete=models.CASCADE)


class Commute(models.Model):
    commute_id = models.ForeignKey(UserCommute.commute_id, primary_key=True, on_delete=models.CASCADE)
    car = models.TextField()
    transmission = models.TextField()
    distance = models.FloatField()
    city_perc = models.FloatField()


class FortisBillField(models.Model):
    user_id = models.ForeignKey(User.id, on_delete=models.CASCADE)
    start_date = models.DateField()
    end_date = models.DateField()
    num_days = models.SmallIntegerField()
    consumption = models.FloatField()
    avg_temp = models.FloatField()


class HydroBillField(models.Model):
    user_id = models.ForeignKey(User.id, on_delete=models.CASCADE)
    start_date = models.DateField()
    num_days = models.SmallIntegerField()
    city = models.TextField()


class UserEmissions(models.Model):
    user_id = models.ForeignKey(User.id, on_delete=models.CASCADE)
    month = models.SmallIntegerField()
    emission = models.FloatField()
