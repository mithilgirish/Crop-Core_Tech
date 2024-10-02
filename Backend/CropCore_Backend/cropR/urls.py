from django.urls import path
from .views import CropRecommendationView

urlpatterns = [
    path('recommend/', CropRecommendationView.as_view(), name='crop-recommendation'),
]