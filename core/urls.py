from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('api/v1/seeds/', include('seeds.urls')),
    path('api/v1/auth/', include('authentication.urls')),
    path('admin/', admin.site.urls),
]
