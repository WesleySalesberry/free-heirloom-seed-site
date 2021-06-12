from django.db import models
from django.utils import timezone
from django.utils.translation import gettext_lazy as _

from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
# from django.contrib.auth.models import AbstractUser


class CustomUserManager(BaseUserManager):
    def create_user(self, email, password, first_name, last_name, **extra):

        if not first_name:
            raise ValueError(_('First Name Cannot be Blank'))

        if not email:
            raise ValueError(_('Email Cannot be Blank'))

        user = self.model(
            email=self.normalize_email(email),
            first_name=first_name,
            last_name=last_name
        )

        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(self, email, password, first_name, last_name, **extra):

        if not first_name:
            raise ValueError(_('First Name Cannot be Blank'))

        if not email:
            raise ValueError(_('Email Cannot be Blank'))

        user = self.create_user(
            email,
            password=password,
            first_name=first_name,
            last_name=last_name,
        )

        user.staff = True
        user.is_admin = True
        user.is_superuser = True
        user.save(using=self._db)

        return user


class CustomerModel(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(
        verbose_name='email address', max_length=254, unique=True)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50, blank=True)
    sign_up_date = models.DateTimeField(default=timezone.now)
    is_staff = models.BooleanField(default=False)
    is_admin = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    """Use for later in email to set active and start account"""
    # is_active = models.BooleanField(default=False)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']

    objects = CustomUserManager()

    def __str__(self):
        return self.first_name

    def has_perm(self, perm, obj=None):
        return True

    def has_module_perms(self, app_label):
        return True

    @property
    def is_staff(self):
        return self.is_admin

# class CustomerModel(AbstractUser):
#     name = models.CharField(max_length=50)
#     email = models.EmailField(max_length=254, unique=True)
#     password = models.CharField(max_length=250)
#     username = models.CharField(max_length=50, blank=True)

#     USERNAME_FIELD = 'email'

#     REQUIRED_FIELDS = []
