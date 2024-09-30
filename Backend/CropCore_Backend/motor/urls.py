from django.urls import path
from . import views

urlpatterns = [
    path('esp32/sensor/', views.receive_sensor_data, name='receive_sensor_data'),
    path('esp32/motor/', views.control_motor, name='control_motor'),
    path('esp32/motor/<str:action>/', views.update_motor, name='update_motor'),

]
