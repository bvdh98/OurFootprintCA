from django.db import models


# Sample table to store users and their footprint as some arbitrary integer
class SampleUser(models.Model):
    name = models.CharField(max_length=20)
    footprint = models.PositiveIntegerField()
