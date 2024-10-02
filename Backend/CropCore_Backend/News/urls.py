# myapp/urls.py

from django.urls import path
from .views import LiveMintScraper

urlpatterns = [
    path('News/', LiveMintScraper.as_view(), name='live_mint_scraper'),
]
