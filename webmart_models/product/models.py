from django.db import models
from category.models import *
from simple_history.models import HistoricalRecords

class Product(models.Model):
    name = models.CharField(max_length=50)
    description = models.TextField()
    date_added = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)
    removed = models.BooleanField(default=False)
    category = models.ManyToManyField(
        Category,
        related_name="products",
        blank=True
    )

    history = HistoricalRecords()