from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
# from .views import CustomerCreate
from . import views

urlpatterns = [
    path('register/', views.register_view),
    path('login/', views.login_view),
    path('get-user/', views.get_user)
    # path('register/', views.Register.as_view()),
    # path('login/', views.LoginView.as_view()),
    # path('user/', views.UserView.as_view()),
]
