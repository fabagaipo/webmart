from django.db import models
from product.models import *
from user_profile.models import *

class Order(models.Model):
    PREPARING = 0
    SHIPPED = 2
    DELIVERED = 1
    CANCELLED = 3

    status_tuples = [
        (PREPARING, "Preparing"),
        (SHIPPED, "Shipped"),
        (DELIVERED, "Delivered"),
        (CANCELLED, "Cancelled")
    ]
    product = models.ForeignKey(
        Product,
        related_name="orders",
        on_delete=models.DO_NOTHING
    )
    status = models.IntegerField(choices=status_tuples)
    recipient = models.ForeignKey(
        UserProfile,
        on_delete=models.DO_NOTHING
    )