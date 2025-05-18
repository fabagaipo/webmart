from django.db import models

class Category(models.Model):
    title = models.CharField(max_length=50)
    description = models.TextField(blank=True)
    date_added = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)
    image_url = models.CharField(max_length=50, blank=True)
    removed = models.BooleanField(default=False)

    def __str__(self):
        return self.name
