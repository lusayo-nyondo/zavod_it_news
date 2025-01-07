from django.contrib import admin
from unfold import admin as unfold_admin  # type: ignore

from .models import (
    NewsItem,
    NewsItemImage,
    NewsItemTag
)


class NewsItemImageInline(unfold_admin.TabularInline):
    model = NewsItemImage


@admin.register(NewsItem)
class NewsItemAdmin(unfold_admin.ModelAdmin):
    inlines = [
        NewsItemImageInline
    ]


@admin.register(NewsItemTag)
class NewsItemTagAdmin(unfold_admin.ModelAdmin):
    pass
