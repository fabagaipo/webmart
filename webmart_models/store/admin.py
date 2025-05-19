from django.contrib import admin
from store.models import *

@admin.register(Store)
class StoreAdmin(admin.ModelAdmin):
    list_display = ["name"]
