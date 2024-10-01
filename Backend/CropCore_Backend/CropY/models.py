from django.db import models

class StateRainfall(models.Model):
    state = models.CharField(max_length=100, unique=True)
    annual_rainfall = models.FloatField()
    
    def __str__(self):
        return self.state
