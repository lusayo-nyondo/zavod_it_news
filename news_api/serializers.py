from rest_framework import serializers  # type: ignore

from .models import (
    NewsItem,
    NewsItemTag,
    NewsItemImage,
    NewsItemUserReactionEvent
)


class NewsItemTagSerializer(serializers.ModelSerializer):
    class Meta:
        model = NewsItemTag
        fields = [
            'id',
            'label',
            'image',
        ]


class NewsItemImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = NewsItemImage
        fields = [
            'id',
            'image',
        ]


class NewsItemSerializer(serializers.ModelSerializer):
    tags: NewsItemTagSerializer = NewsItemTagSerializer(
        many=True,
        read_only=True
    )
    images: NewsItemImageSerializer = NewsItemImageSerializer(
        many=True,
        read_only=True
    )

    class Meta:
        model = NewsItem
        fields = '__all__'
        read_only_fields = [
            'id',
            'created_on',
            'updated_on'
        ]


class NewsItemUserReactionEventSerializer(serializers.ModelSerializer):
    class Meta:
        model = NewsItemUserReactionEvent
        fields = '__all__'
        read_only_fields = [
            'id',
            'created_on',
            'updated_on',
        ]
