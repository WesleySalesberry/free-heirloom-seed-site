from django.urls import path
from . import views

urlpatterns = [
    path('seeds/', views.get_seeds, name="all-seeds"),
    path('seeds/<slug:slug>/', views.get_seed, name="single-seeds")
]
