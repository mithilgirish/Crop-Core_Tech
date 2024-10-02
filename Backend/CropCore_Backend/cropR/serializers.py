from rest_framework import serializers
from .models import CropRecommendation

class CropRecommendationSerializer(serializers.ModelSerializer):
    class Meta:
        model = CropRecommendation
        fields = ['N', 'P', 'K', 'temperature', 'humidity', 'ph', 'rainfall', 'recommended_crop']
        read_only_fields = ['recommended_crop']