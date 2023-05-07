from django.db import models

# Create your models here.
class Services(models.Model):
    category = models.CharField(max_length=250)
    location = models.CharField(max_length=200)
    product = models.CharField(max_length=200)

    class Meta:
        verbose_name = ("Service")

    def __str__(self):
        return self.category

