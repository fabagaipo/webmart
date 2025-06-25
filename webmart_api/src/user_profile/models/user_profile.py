from django.contrib.auth.models import User
from django.db import models


class UserProfile(models.Model):
    user = models.OneToOneField(
        User, related_name="user_profile", on_delete=models.CASCADE
    )
    avatar_url = models.CharField(max_length=50, blank=True)


class Address(models.Model):
    user_profile = models.ForeignKey(
        UserProfile, related_name="address_list", on_delete=models.CASCADE
    )
    region_code = models.CharField(max_length=10)
    province_code = models.CharField(max_length=10)
    city_code = models.CharField(max_length=10)
    barangay_code = models.CharField(max_length=10)
    phone_number = models.CharField(max_length=13)
    details = models.CharField(max_length=50, blank=True, null=True)
