# Generated by Django 3.0.5 on 2020-05-07 21:10

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Vehicles',
            fields=[
                ('id', models.PositiveIntegerField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=60)),
                ('year', models.PositiveIntegerField()),
                ('trany', models.CharField(max_length=60)),
                ('charge120', models.FloatField()),
                ('charge240', models.FloatField()),
                ('city08', models.FloatField()),
                ('cityE', models.FloatField()),
                ('combE', models.FloatField()),
                ('feScore', models.FloatField()),
                ('fuelCost08', models.FloatField()),
                ('ghgScore', models.FloatField()),
                ('highway08', models.FloatField()),
                ('highwayE', models.FloatField()),
                ('UCity', models.FloatField()),
                ('youSaveSpend', models.FloatField()),
            ],
        ),
    ]