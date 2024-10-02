from django.urls import path
from . import views


urlpatterns = [
    path('predict_yield/', views.predict_yield, name='predict_yield'),
    path('getdrop_downdata/', views.get_dropdown_data, name='getdrop_downdata'),
]