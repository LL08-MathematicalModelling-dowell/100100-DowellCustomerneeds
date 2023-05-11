from django.db import models

# Create your models here.
class Services(models.Model):
    location = models.CharField(max_length=200)
    category = models.CharField(max_length=250)    
    product = models.CharField(max_length=200)

    class Meta:
        verbose_name = ("Service")

    def __str__(self):
        return self.category

