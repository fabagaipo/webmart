from django.db import models
from simple_history.models import HistoricalRecords
from user_profile.models.user_profile import UserProfile, Address
from product.models.product import Product


class Store(models.Model):
    description = models.JSONField(null=True)
    name = models.CharField(max_length=50)
    owner = models.ForeignKey(
        UserProfile, related_name="stores", on_delete=models.CASCADE
    )
    products = models.ManyToManyField(
        Product, related_name="stores", through="store.Inventory"
    )
    added_on = models.DateTimeField(auto_now_add=True)
    updated_on = models.DateTimeField(auto_now=True)
    image_data = models.JSONField(null=True)
    banner_data = models.JSONField(null=True)
    address = models.OneToOneField(
        Address,
        related_name="store",
        on_delete=models.CASCADE,
        null=True,
    )
    history = HistoricalRecords()


class Inventory(models.Model):
    store = models.ForeignKey(
        Store,
        related_name="inventories",
        on_delete=models.CASCADE,
    )
    product = models.ForeignKey(
        Product, related_name="inventories", on_delete=models.CASCADE
    )
    quantity = models.PositiveIntegerField()
    history = HistoricalRecords()

    class Meta:
        unique_together = ("store", "product")


class StoreApplicationManager(models.Manager):
    def create(self, *args, **kwargs):
        name = kwargs.get("name")
        owner = kwargs.get("applicant")

        store_instance = Store.objects.create(name=name, owner=owner)
        kwargs["store"] = store_instance

        super().create(*args, **kwargs)


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
        UserProfile,
        related_name="store_application",
        on_delete=models.DO_NOTHING,
    )
    history = HistoricalRecords()
    identification = models.JSONField()
    name = models.CharField(max_length=15)
    status = models.PositiveIntegerField(choices=application_statuses)
    store = models.OneToOneField(
        Store, related_name="application", on_delete=models.DO_NOTHING
    )
    submitted_on = models.DateTimeField(auto_now_add=True)
    updated_on = models.DateTimeField(auto_now=True)

    objects = StoreApplicationManager()
