from django.db import models

# Create your models here.
class Data(models.Model):
    deaths = models.CharField(max_length=1000)
    cases = models.CharField(max_length=1000)
    recovered = models.CharField(max_length=1000)