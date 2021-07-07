from django.db import models
from django.utils import timezone

from authentication.models import CustomerModel
from seeds.models import SeedModel


class OrderModel(models.Model):
    user = models.ForeignKey(CustomerModel, on_delete=models.CASCADE)
    payment_method = models.CharField(max_length=50)
    confirmation = models.CharField(max_length=255)
    total_price = models.DecimalField(max_digits=5, decimal_places=2)
    is_paid = models.BooleanField(default=False)
    has_been_sent = models.BooleanField(default=False)
    order_created = models.DateTimeField()

    def __str__(self):
        return self.user

    def __str__(self):
        return self.confirmation


class OrderedItemsModel(models.Model):
    user = models.ForeignKey(CustomerModel, blank=True, null=True,
                             on_delete=models.CASCADE)
    seed = models.ForeignKey(SeedModel, blank=True,
                             null=True,  on_delete=models.CASCADE)
    order = models.ForeignKey(OrderModel, blank=True,
                              null=True, on_delete=models.CASCADE)

    class Meta:
        unique_together = ['order', 'seed']

    def __str__(self):
        return str(self.order)
