from django.db import models

class SoilFertilityPrediction(models.Model):
    N = models.FloatField()
    P = models.FloatField()
    K = models.FloatField()
    pH = models.FloatField()
    EC = models.FloatField()
    OC = models.FloatField()
    S = models.FloatField()
    Zn = models.FloatField()
    Fe = models.FloatField()
    Cu = models.FloatField()
    Mn = models.FloatField()
    B = models.FloatField()
    predicted_fertility = models.CharField(max_length=20)