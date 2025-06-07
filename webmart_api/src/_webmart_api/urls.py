from django.contrib import admin
from django.urls import path
from _webmart_api.api import webmart

urlpatterns = [path("admin/", admin.site.urls), path("webmart/", webmart.urls)]
