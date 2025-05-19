from django.contrib import admin
from category.models import *

@admin.register(Category)
class ProductAdmin(admin.ModelAdmin):
    list_display = ["title", "description"]
