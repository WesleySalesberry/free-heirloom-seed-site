from django.urls import path
from . import views

urlpatterns = [
    path('create-address/', views.create_shipping),
    path('get-address/', views.get_shipping),
    path('update-address/', views.update_shipping)
]
