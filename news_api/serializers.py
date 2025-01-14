from rest_framework import serializers  # type: ignore

from .models import (
    NewsItem,
    NewsItemTag,
    NewsItemImage,
    NewsItemUserReactionEvent
)


class NewsItemTagSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(
        required=False
    )
    views = serializers.SerializerMethodField()

    def get_views(self, obj):
        return obj.views

    class Meta:
        model = NewsItemTag
        fields = [
            'id',
            'label',
            'image',
            'views',
        ]
        read_only_fields = [
            'id',
            'views',
        ]


class NewsItemImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = NewsItemImage
        fields = [
            'id',
            'image',
        ]
        read_only_fields = ['id']


class NewsItemSerializer(serializers.ModelSerializer):
    tags: NewsItemTagSerializer = NewsItemTagSerializer(
        many=True,
        read_only=True
    )
    main_image: serializers.ImageField = serializers.ImageField(
        required=False
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
            'updated_on',
            'views'
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
