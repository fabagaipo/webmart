from django.contrib.auth.models import User
from django.db import models


class UserProfile(models.Model):
    user = models.OneToOneField(
        User, related_name="user_profile", on_delete=models.CASCADE
    )
    avatar_data = models.JSONField(blank=True, null=True)
    addresses = models.ManyToManyField(
        "user_profile.Address", blank=True, related_name="profiles"
    )


class Address(models.Model):
    region_code = models.CharField(max_length=10, null=True, blank=True)
    province_code = models.CharField(max_length=10, null=True, blank=True)
    city_code = models.CharField(max_length=10, null=True, blank=True)
    barangay_code = models.CharField(max_length=10, null=True, blank=True)
    phone_number = models.CharField(max_length=13, null=True, blank=True)
    street = models.CharField(max_length=25, null=True, blank=True)
    details = models.CharField(max_length=50, blank=True, null=True)
