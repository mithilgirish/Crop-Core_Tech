from django.urls import path
from .views import SoilFertilityPredictionView

urlpatterns = [
    path('predict/', SoilFertilityPredictionView.as_view(), name='soil-fertility-prediction'),
]