from django.db import models
from django.conf import settings


class ShippingModel(models.Model):
    addressee = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    address = models.CharField(max_length=50)
    city = models.CharField(max_length=50)
    state = models.CharField(max_length=50)
    postal_code = models.CharField("", max_length=50)
    country = models.CharField(max_length=50)

    def __str__(self):
        return str(self.addressee)
