from django.contrib.auth.models import (
    User
)

from rest_framework.viewsets import (  # type: ignore
    ModelViewSet
)

from rest_framework.decorators import (  # type: ignore
    action
)

from rest_framework.response import (  # type: ignore
    Response
)

from rest_framework.pagination import (  # type: ignore
    PageNumberPagination
)

from django_filters import (  # type: ignore
    rest_framework as filters
)

from .models import (
    NewsItem,
    NewsItemTag,
)


from .serializers import (
    NewsItemSerializer,
    NewsItemTagSerializer
)


class NewsItemTagViewSet(ModelViewSet):
    queryset = NewsItemTag.objects.all()
    serializer_class = NewsItemTagSerializer


class NewsItemFilter(filters.FilterSet):
    tag = filters.NumberFilter(field_name='tags__id')

    class Meta:
        model = NewsItem
        fields = [
            'tag'
        ]


class NewsItemPaginator(PageNumberPagination):
    page_size = 3


class NewsItemAdminPaginator(PageNumberPagination):
    page_size = 18


class NewsItemAdminViewSet(ModelViewSet):
    queryset = NewsItem.objects.all()
    serializer_class = NewsItemSerializer
    pagination_class = NewsItemAdminPaginator


class NewsItemViewSet(ModelViewSet):
    queryset = NewsItem.objects.all()
    serializer_class = NewsItemSerializer
    pagination_class = NewsItemPaginator
    filterset_class = NewsItemFilter

    @action(detail=True, methods=['get'])
    def get_user_reaction(self, request, pk=None):
        item: NewsItem = self.get_object()

        data = request.query_params
        user = User.objects.get(
            id=data['user']
        )

        reaction = item.get_user_reaction(user)

        return Response(
            {
                'status': 'success',
                'data': reaction
            }
        )

    @action(detail=True, methods=['get'])
    def get_likes_count(self, request, pk=None):
        item: NewsItem = self.get_object()
        likes = item.get_user_reaction_count(
            type='like'
        )

        return Response(
            {
                'status': 'success',
                'data': {
                    'count': likes
                },
            }
        )

    @action(detail=True, methods=['get'])
    def get_dislikes_count(self, request, pk=None):
        item: NewsItem = self.get_object()
        dislikes = item.get_user_reaction_count(
            type='dislike'
        )

        return Response(
            {
                'status': 'success',
                'data': {
                    'count': dislikes
                },
            }
        )

    @action(detail=True, methods=['post'])
    def set_user_reaction(self, request, pk=None):
        item: NewsItem = self.get_object()

        data = request.data
        user = User.objects.get(
            id=data['user']
        )
        reaction = request.data['reaction']

        item.set_user_reaction(
            reaction=reaction,
            user=user
        )

        return Response(
            {
                'status': 'success',
                'data': NewsItemSerializer(item).data
            }
        )
