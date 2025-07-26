from django.db import models


class Category(models.Model):
    title = models.CharField(max_length=50)
    description = models.TextField(blank=True)
    date_added = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)
    image_data = models.JSONField()

    def __str__(self):
        return self.title
