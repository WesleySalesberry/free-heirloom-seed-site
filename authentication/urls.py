from django.urls import path
# from .views import CustomerCreate
from . import views

urlpatterns = [
    path('register/', views.register_view),
    path('login/', views.login_view),
    path('get-user/', views.get_user),
    path('update-user/', views.update_user)
]
