from django.urls import (
    path,
    include
)

from rest_framework import routers  # type: ignore

from .views import (
    NewsItemViewSet
)


news_api_router = routers.DefaultRouter()
news_api_router.register(
    r'newsitems',
    NewsItemViewSet
)

urlpatterns = [
    path('', include(news_api_router.urls)),
]
