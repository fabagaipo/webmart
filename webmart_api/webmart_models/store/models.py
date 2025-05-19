from django.db import models
from user_profile.models import *


class Store(models.Model):
    name = models.CharField(max_length=50)
    owner = models.ForeignKey(
        UserProfile,
        related_name="stores",
        on_delete=models.CASCADE
    )
    products = models.ManyToManyField(
        "product.Product",
        related_name="stores",
        through="store.Inventory"
    )
    date_added = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)
    image_url = models.CharField(max_length=50, blank=True)
    banner_url = models.CharField(max_length=50, blank=True)
    address = models.CharField(max_length=250, blank=True)


class Inventory(models.Model):
    store = models.ForeignKey(
        "store.Store",
        related_name="inventories",
        on_delete=models.CASCADE
    )
    product = models.ForeignKey(
        "product.Product",
        related_name="inventories",
        on_delete=models.CASCADE
    )
    quantity = models.PositiveIntegerField()

    class Meta:
        unique_together = ("store", "product")