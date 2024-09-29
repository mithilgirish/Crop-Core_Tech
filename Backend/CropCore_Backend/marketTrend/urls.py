# market/urls.py
from django.urls import path
from .views import get_market_prices

urlpatterns = [
    path('market-prices/', get_market_prices, name='market-prices'),
]
