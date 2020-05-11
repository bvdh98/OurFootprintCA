# Generated by Django 3.0.5 on 2020-05-09 02:38

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('calculator', '0003_commute_car_year'),
    ]

    operations = [
        migrations.RenameField(
            model_name='commute',
            old_name='car',
            new_name='vehicle',
        ),
        migrations.RenameField(
            model_name='commute',
            old_name='car_year',
            new_name='vehicle_year',
        ),
        migrations.AlterField(
            model_name='commute',
            name='commute_id',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to='calculator.UserCommute'),
        ),
    ]