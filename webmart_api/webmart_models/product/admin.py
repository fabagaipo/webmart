from django.contrib import admin
from product.models import *

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ["name", "description", "removed"]
