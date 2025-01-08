import os

from django.conf import settings
from django.db import models


from django.contrib.auth.models import (
    User
)


def _get_news_item_image_upload_path(instance, filename):
    media_root = getattr(settings, 'MEDIA_ROOT')

    return os.path.join(
        media_root,
        'news_items',
        str(instance.id),
        filename
    )


class NewsItem(models.Model):
    title: models.CharField = models.CharField(
        max_length=255
    )
    main_image: models.ImageField = models.ImageField(
        upload_to=_get_news_item_image_upload_path
    )
    text: models.TextField = models.TextField()
    created_on: models.DateTimeField = models.DateTimeField(
        auto_now_add=True
    )
    updated_on: models.DateTimeField = models.DateTimeField(
        auto_now=True
    )

    def set_user_reaction(self, reaction: str, user: User):
        user_reaction_event, is_new_object = \
            NewsItemUserReactionEvent.objects.get_or_create(
                news_item=self,
                user=user
            )
        user_reaction_event.event_type = reaction
        user_reaction_event.save()

    def __str__(self):
        return self.title


class NewsItemImage(models.Model):
    news_item: models.ForeignKey = models.ForeignKey(
        NewsItem,
        on_delete=models.CASCADE,
        related_name="images"
    )
    image: models.ImageField = models.ImageField(
        upload_to=_get_news_item_image_upload_path,
    )
    created_on: models.DateTimeField = models.DateTimeField(
        auto_now_add=True
    )
    updated_on: models.DateTimeField = models.DateTimeField(
        auto_now=True
    )

    def __str__(self):
        return (
            f"{self.news_item}-images-{self.image.name}"
        )


class NewsItemTag(models.Model):
    news_item: models.ManyToManyField = models.ManyToManyField(
        NewsItem,
    )
    label: models.CharField = models.CharField(
        max_length=120
    )
    created_on: models.DateTimeField = models.DateTimeField(
        auto_now_add=True
    )
    updated_on: models.DateTimeField = models.DateTimeField(
        auto_now=True
    )

    def __str__(self):
        return self.label


class NewsItemUserReactionEvent(models.Model):
    event_type: models.CharField = models.CharField(
        max_length=25,
        choices=(
            ('like', 'Like'),
            ('dislike', 'Dislike'),
        )
    )
    user: models.ForeignKey = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='reactions',
    )
    news_item: models.ForeignKey = models.ForeignKey(
        NewsItem,
        on_delete=models.CASCADE,
        related_name='reactions',
    )
    created_on: models.DateTimeField = models.DateTimeField(
        auto_now_add=True
    )
    updated_on: models.DateTimeField = models.DateTimeField(
        auto_now=True
    )

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['user', 'news_item'],
                name='unique_user_reaction_to_news_item',
            )
        ]

    def __str__(self):
        return (
            f"{self.user} - {self.event_type} - "
            f"{self.news_item}"
        )
