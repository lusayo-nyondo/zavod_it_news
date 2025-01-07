from django.contrib import admin

from .models import (
    NewsItem,
    NewsItemImage,
    NewsItemTag
)


class NewsItemImageInline(admin.TabularInline):
    model = NewsItemImage


@admin.register(NewsItem)
class NewsItemAdmin(admin.ModelAdmin):
    inlines = [
        NewsItemImageInline
    ]


@admin.register(NewsItemTag)
class NewsItemTagAdmin(admin.ModelAdmin):
    pass
