from django.contrib import admin
from store.models.store import *


@admin.register(Store)
class StoreAdmin(admin.ModelAdmin):
    list_display = ["name"]
