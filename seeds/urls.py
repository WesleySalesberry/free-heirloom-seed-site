from django.urls import path
from . import views

urlpatterns = [
    path('all-seeds/', views.get_seeds, name="all-seeds"),
    path('<slug:slug>/', views.get_seed, name="single-seeds")
]
