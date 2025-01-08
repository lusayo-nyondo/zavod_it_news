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

from .models import (
    NewsItem,
)


from .serializers import (
    NewsItemSerializer
)


class NewsItemPaginator(PageNumberPagination):
    page_size = 3


class NewsItemViewSet(ModelViewSet):
    queryset = NewsItem.objects.all()
    serializer_class = NewsItemSerializer
    pagination_class = NewsItemPaginator

    @action(detail=True, methods=['post'])
    def set_user_reaction(self, request, pk=None):
        item: NewsItem = self.get_object()

        data = request.data
        user = User.objects.get(
            user=data['user']
        )
        reaction = request.data['reaction']

        item.set_user_reaction(
            reaction=reaction,
            user=user
        )

        return Response(
            {
                'status': 'item marked as completed',
                'item': NewsItemSerializer(item).data
            }
        )
