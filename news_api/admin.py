from django.contrib import admin
from unfold import admin as unfold_admin  # type: ignore

from .models import (
    NewsItem,
    NewsItemImage,
    NewsItemTag,
    NewsItemUserReactionEvent
)


class NewsItemImageInline(unfold_admin.TabularInline):
    model = NewsItemImage


class NewsItemReactionsInline(unfold_admin.TabularInline):
    model = NewsItemUserReactionEvent


@admin.register(NewsItem)
class NewsItemAdmin(unfold_admin.ModelAdmin):
    inlines = [
        NewsItemImageInline,
        NewsItemReactionsInline,
    ]


@admin.register(NewsItemTag)
class NewsItemTagAdmin(unfold_admin.ModelAdmin):
    pass


@admin.register(NewsItemUserReactionEvent)
class NewsItemUserReactionEventAdmin(unfold_admin.ModelAdmin):
    pass
