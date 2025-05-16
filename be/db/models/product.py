from tortoise import fields, models

class Product(models.Model):
    id = fields.IntField(pk=True)
    name = fields.CharField(max_length=250)
    description = fields.JSONField()
    date_added = fields.DatetimeField(auto_now_add=True)
    date_updated = fields.DatetimeField(auto_now=True)
    #category = fields.ForeignKeyField()
    #image = models.ImageField(upload_to='products/', null=True, blank=True)
    is_active = fields.BooleanField(default=False)
    removed = fields.BooleanField(default=False)
