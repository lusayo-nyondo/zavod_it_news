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


class NewsItemQuerySet(models.QuerySet):
    pass


class NewsItemManager(models.Manager):
    model = type['NewsItem']

    def get_queryset(self, *args, **kwargs):
        return NewsItemQuerySet(
            model=self.model,  # type: ignore
            using=self.db
        ).annotate(
            models.Count(
                models.F('reactions')
            ),
        )


class NewsItem(models.Model):
    class Meta:
        ordering = [
            '-created_on'
        ]

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

    def get_user_reactions(self, type: str | None = None):
        if type:
            reactions = NewsItemUserReactionEvent.objects.filter(
                news_item=self,
                event_type=type
            )
        else:
            reactions = NewsItemUserReactionEvent.objects.filter(
                news_item=self
            )

        return reactions

    def get_user_reaction_count(self, type: str | None = None):
        reactions = self.get_user_reactions(type)
        return reactions.count()

    def set_user_reaction(self, reaction: str, user: User):
        user_reaction_event, is_new_object = NewsItemUserReactionEvent.objects.get_or_create(  # noqa: E501
            news_item=self,
            user=user
        )

        if user_reaction_event.event_type == reaction:
            user_reaction_event.delete()
        else:
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
        related_name='tags',
    )
    image: models.ImageField = models.ImageField(
        upload_to='tags',
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
