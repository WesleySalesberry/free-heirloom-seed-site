from django.urls import path
from . import views

urlpatterns = [
    path('create-order/', views.create_order),
    path('add-order/', views.add_order),
    path('get-orders/', views.get_orders),
]
