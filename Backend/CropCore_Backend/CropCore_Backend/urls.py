
from django.contrib import admin
from django.urls import path
from django.urls import include


urlpatterns = [
    path('admin/', admin.site.urls),
    path('motor/', include('motor.urls')),
    path('api/', include('marketTrend.urls')),
    path('AIY/', include('CropY.urls')),
    path('AIR/', include('cropR.urls')),
    path('AISF/', include('cropSF.urls')),
    path('api/', include('News.urls')),
]

