from django.contrib.auth.models import User
from django.db import models


class BillField(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    consumption = models.FloatField()

    class Meta:
        abstract = True


class FortisBillField(BillField):
    """
    Each entry in this table corresponds to an entry in users' Fortis bill.
    """
    start_date = models.DateField()
    end_date = models.DateField()
    num_days = models.SmallIntegerField()
    avg_temp = models.FloatField()


class HydroBillField(BillField):
    """
    Each entry in this table corresponds to an entry in users' Fortis bill.
    """
    start_date = models.DateField()
    num_days = models.SmallIntegerField()
    city = models.TextField()
