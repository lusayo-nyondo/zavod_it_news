from django.shortcuts import render
from django.http import (
    HttpResponse
)


def app(request) -> HttpResponse:
    return render(
        request,
        'news_app/index.html'
    )
