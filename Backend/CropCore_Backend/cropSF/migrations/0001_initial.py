# Generated by Django 5.1.1 on 2024-10-01 17:16

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='SoilFertilityPrediction',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('N', models.FloatField()),
                ('P', models.FloatField()),
                ('K', models.FloatField()),
                ('pH', models.FloatField()),
                ('EC', models.FloatField()),
                ('OC', models.FloatField()),
                ('S', models.FloatField()),
                ('Zn', models.FloatField()),
                ('Fe', models.FloatField()),
                ('Cu', models.FloatField()),
                ('Mn', models.FloatField()),
                ('B', models.FloatField()),
                ('predicted_fertility', models.CharField(max_length=20)),
            ],
        ),
    ]
