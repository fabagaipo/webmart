from django.db import models
from simple_history.models import HistoricalRecords


class Store(models.Model):
    description = models.JSONField()
    name = models.CharField(max_length=50)
    owner = models.ForeignKey(
        "user_profile.UserProfile", related_name="stores", on_delete=models.CASCADE
    )
    products = models.ManyToManyField(
        "product.Product", related_name="stores", through="store.Inventory"
    )
    added_on = models.DateTimeField(auto_now_add=True)
    updated_on = models.DateTimeField(auto_now=True)
    image_url = models.JSONField()
    banner_url = models.JSONField()
    address = models.OneToOneField(
        "user_profile.Address", related_name="store", on_delete=models.CASCADE
    )
    history = HistoricalRecords()


class Inventory(models.Model):
    store = models.ForeignKey(
        "store.Store", related_name="inventories", on_delete=models.CASCADE
    )
    product = models.ForeignKey(
        "product.Product", related_name="inventories", on_delete=models.CASCADE
    )
    quantity = models.PositiveIntegerField()
    history = HistoricalRecords()

    class Meta:
        unique_together = ("store", "product")


class StoreApplication(models.Model):
    PENDING = 0
    APPROVED = 1
    REJECTED = 2
    APPEALED = 3

    application_statuses = [
        (PENDING, "Pending"),
        (APPROVED, "Approved"),
        (REJECTED, "Rejected"),
        (APPEALED, "Appealed"),
    ]

    applicant = models.OneToOneField(
        "user_profile.UserProfile",
        related_name="store_application",
        on_delete=models.DO_NOTHING,
    )
    history = HistoricalRecords()
    identification = models.JSONField()
    name = models.CharField(max_length=15)
    status = models.PositiveIntegerField(choices=application_statuses)
    store = models.OneToOneField(
        "store.Store", related_name="application", on_delete=models.DO_NOTHING
    )
    submitted_on = models.DateTimeField(auto_now_add=True)
    updated_on = models.DateTimeField(auto_now=True)
