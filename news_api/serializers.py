from rest_framework import serializers  # type: ignore

from .models import (
    NewsItem,
    NewsItemUserReactionEvent
)


class NewsItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = NewsItem
        fields = '__all__'
        readonly_fields = [
            'id',
            'created_on',
            'updated_on'
        ]


class NewsItemUserReactionEventSerializer(serializers.ModelSerializer):
    class Meta:
        model = NewsItemUserReactionEvent
        fields = '__all__'
        readonly_fields = [
            'id',
            'created_on',
            'updated_on',
        ]
