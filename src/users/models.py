from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class UserHealth(models.Model):
    data = models.JSONField()
    owner = models.ForeignKey(User, on_delete=models.CASCADE, default=None)