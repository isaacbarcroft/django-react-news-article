from django.db import models

# Create your models here.

class Article(models.Model):
    title = models.CharField(max_length= 255, null=True)
    body = models.TextField()
    image = models.ImageField(upload_to='profiles/', null=True)