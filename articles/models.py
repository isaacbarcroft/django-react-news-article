from django.db import models
from django.conf import settings
from django.db.models.fields import DateTimeField
# Create your models here.

class Article(models.Model):
    DRAFT = 'DRAFT'
    SUBMITTED = 'SUBMITTED'
    PUBLISHED = 'PUBLISHED'
    REJECTED = 'REJECTED'
    CHOICES = [
        (DRAFT, 'Draft'),
        (SUBMITTED, 'Submitted'),
        (PUBLISHED, 'Published'),
        (REJECTED, 'Rejected'),
    ]
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True)
    title = models.CharField(max_length= 255, null=True)
    body = models.TextField()
    image = models.ImageField(upload_to='profiles/', null=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now_add=True, null=True)
    categories = models.CharField(max_length= 255, null=True)
    options = models.CharField(
        max_length=10,
        choices=CHOICES,
        default=DRAFT,
    )
    # is_published = models.BooleanField(default=False, null=True)

    def __str__(self):  
        return self.title

