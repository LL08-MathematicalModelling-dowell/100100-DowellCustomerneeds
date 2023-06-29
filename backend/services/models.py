from django.db import models

# Create your models here.
class Services(models.Model):
    q1 = models.CharField(max_length=200)
    q2 = models.CharField(max_length=250)
    q3 = models.CharField(max_length=200)

    class Meta:
        verbose_name = ("Service")

    def __str__(self):
        return self.category

