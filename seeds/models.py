from django.db import models
from django.contrib.auth.models import User
from cloudinary.models import CloudinaryField
from django.utils.text import slugify
from decimal import Decimal
from django.utils import timezone


class SeedModel(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=200)
    image = CloudinaryField('Image')
    seedID = models.CharField(max_length=50)
    description = models.TextField()
    maturity = models.CharField(max_length=50)
    countInStock = models.IntegerField(null=True, blank=True, default=0)
    slug = models.SlugField(unique=True, blank=True)
    in_stock = models.BooleanField(default=False)
    price = models.DecimalField(
        max_digits=5, decimal_places=2, default=Decimal('0.80'))
    is_oversized = models.BooleanField(default=False)
    addAt = models.DateTimeField(default=timezone.now)

    def save(self, *args, **kwargs):
        self.slug = slugify(self.name)
        super(SeedModel, self).save(*args, **kwargs)

    def __str__(self):
        return self.name

    def __str__(self):
        return str(self.countInStock)


# oversized seeds costs a min. of $3.90
# set boolean for oversize seed
