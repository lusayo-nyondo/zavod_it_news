from django.urls import (
    path,
    include
)

from rest_framework import routers  # type: ignore

from .views import (
    NewsItemViewSet,
    NewsItemAdminViewSet,
    NewsItemTagViewSet
)


news_api_router = routers.DefaultRouter()
news_api_router.register(
    r'newsitems',
    NewsItemViewSet
)
news_api_router.register(
    r'newsitems_admin',
    NewsItemAdminViewSet,
    basename='newsitems_admin',
)
news_api_router.register(
    r'tags',
    NewsItemTagViewSet
)

urlpatterns = [
    path('', include(news_api_router.urls)),
]
