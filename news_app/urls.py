from django.urls import (
    path
)

from .views import (  # type: ignore
    app
)

app_name = 'app'
urlpatterns = [
    path('', app, name='index'),
]
