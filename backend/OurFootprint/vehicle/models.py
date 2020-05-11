from django.db import models


class Vehicles(models.Model):
    id = models.PositiveIntegerField(primary_key=True)
    name = models.CharField(max_length=60)
    year = models.PositiveIntegerField()
    trany = models.CharField(max_length=60)
    charge120 = models.FloatField()
    charge240 = models.FloatField()
    city08 = models.FloatField()
    cityE = models.FloatField()
    combE = models.FloatField()
    feScore = models.FloatField()
    fuelCost08 = models.FloatField()
    ghgScore = models.FloatField()
    highway08 = models.FloatField()
    highwayE = models.FloatField()
    UCity = models.FloatField()
    youSaveSpend = models.FloatField()
