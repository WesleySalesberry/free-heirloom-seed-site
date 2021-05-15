from django.urls import path
from . import views

urlpatterns = [
    path('login/', views.MyTokenObtainPairView.as_view(), name="login"),
    path('register/', views.register_user, name="register"),
    path('update/', views.update_user),
    path('profile/', views.get_user, name="user"),
    path('all-users/', views.all_users, name="all-user")
]
