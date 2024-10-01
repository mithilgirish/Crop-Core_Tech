from rest_framework import serializers
from .models import SoilFertilityPrediction

class SoilFertilitySerializer(serializers.ModelSerializer):
    class Meta:
        model = SoilFertilityPrediction
        fields = ['N', 'P', 'K', 'pH', 'EC', 'OC', 'S', 'Zn', 'Fe', 'Cu', 'Mn', 'B']