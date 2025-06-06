from django.db import models
from category.models.category import *
from simple_history.models import HistoricalRecords


class Product(models.Model):
    name = models.CharField(max_length=50)
    description = models.TextField()
    date_added = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)
    removed = models.BooleanField(default=False)
    price = models.PositiveIntegerField(default=0)
    category = models.ManyToManyField(Category, related_name="products", blank=True)

    history = HistoricalRecords()


class Sale(models.Model):
    product = models.ForeignKey(
        Product, related_name="sale_configurations", on_delete=models.CASCADE
    )
    markdown = models.DecimalField(max_digits=5, decimal_places=2)
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()
