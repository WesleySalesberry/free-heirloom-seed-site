from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.forms import TextInput, Textarea, CharField

from .models import CustomerModel

admin.site.register(CustomerModel)
