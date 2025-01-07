from django.contrib import admin
from django.urls import (
    path,
    include
)
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('news_api.urls')),
    path('', include('news_app.urls')),
] + static(
    getattr(settings, 'MEDIA_URL'),
    document_root=getattr(settings, 'MEDIA_ROOT'),
)
