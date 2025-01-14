# Generated by Django 5.1.4 on 2025-01-09 08:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('news_api', '0002_alter_newsitemtag_news_item'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='newsitem',
            options={'ordering': ['-created_on']},
        ),
        migrations.AddField(
            model_name='newsitemtag',
            name='image',
            field=models.ImageField(default='/tags/default.webp', upload_to='tags'),
            preserve_default=False,
        ),
    ]
