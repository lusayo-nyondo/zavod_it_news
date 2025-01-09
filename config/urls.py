from django.contrib import admin
from django.urls import (
    path,
    re_path,
    include
)
from django.conf import settings
from django.views.generic import TemplateView
from django.conf.urls.static import static

urlpatterns = [
    path('django_admin', admin.site.urls),
    path('api/', include('news_api.urls')),
] + static(
    getattr(settings, 'MEDIA_URL'),
    document_root=getattr(settings, 'MEDIA_ROOT'),
)

urlpatterns.append(
    re_path(
        r'^.*$',
        TemplateView.as_view(
            template_name="news_app/index.html"
        )
    ),
)
