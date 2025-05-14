from django.db import models


class Product(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True)
    description = models.JSONField(null=True, blank=True)
    date_added = models.DateField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)
    category = models.ForeignKey("Category", on_delete=models.SET_NULL, null=True, blank=True)
    image = models.ImageField(upload_to='products/', null=True, blank=True)
    is_active = models.BooleanField(default=True)
    removed = models.BooleanField(default=False)

    def __str__(self):
        return self.name

    def current_price(self):
        latest_price = self.prices.order_by("-date_effective").first()
        return latest_price.final_price if latest_price else None


class Inventory(models.Model):
    product = models.OneToOneField(
        Product,
        on_delete=models.CASCADE,
        related_name="inventory"
    )
    sku = models.CharField(max_length=50, unique=True)  # Stock Keeping Unit
    quantity = models.PositiveIntegerField(default=0)
    reorder_level = models.PositiveIntegerField(default=0)  # When to notify restock
    last_updated = models.DateTimeField(auto_now=True)
    location = models.CharField(max_length=100, blank=True, null=True)  # e.g., warehouse location

    def __str__(self):
        return f"{self.product.name} - {self.quantity} pcs"


class Price(models.Model):
    product = models.ForeignKey(Product, related_name="prices", on_delete=models.CASCADE)
    base_price = models.DecimalField(max_digits=10, decimal_places=2)
    discount = models.DecimalField(max_digits=5, decimal_places=2, default=0.00, help_text="Percentage discount")
    final_price = models.DecimalField(max_digits=10, decimal_places=2)
    date_effective = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-date_effective']

    def save(self, *args, **kwargs):
        self.final_price = self.base_price * (1 - self.discount / 100)
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.product.name} - {self.final_price}"