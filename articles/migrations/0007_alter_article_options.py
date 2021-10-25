# Generated by Django 3.2.8 on 2021-10-23 15:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('articles', '0006_article_author'),
    ]

    operations = [
        migrations.AlterField(
            model_name='article',
            name='options',
            field=models.CharField(choices=[('DRAFT', 'Draft'), ('SUBMIT', 'Submitted'), ('PUBLISHED', 'Published'), ('REJECTED', 'Rejected')], default='DRAFT', max_length=10),
        ),
    ]