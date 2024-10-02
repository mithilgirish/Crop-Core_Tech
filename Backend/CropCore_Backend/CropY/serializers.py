from rest_framework import serializers
from .models import StateRainfall

class StateRainfallSerializer(serializers.ModelSerializer):
    class Meta:
        model = StateRainfall
        fields = ['state', 'annual_rainfall']

class PredictionInputSerializer(serializers.Serializer):
    crop = serializers.CharField(max_length=100)
    season = serializers.CharField(max_length=100)
    state = serializers.CharField(max_length=100)
    area = serializers.FloatField()
    fertilizer = serializers.FloatField()
    pesticide = serializers.FloatField()