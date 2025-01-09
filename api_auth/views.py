from django.contrib.auth import (
    authenticate,
)
from django.contrib.auth.models import (
    User,
)

from rest_framework import (  # type: ignore
    generics,
)
from rest_framework.response import (  # type: ignore
    Response,
)
from rest_framework.permissions import (  # type: ignore
    AllowAny,
)
from rest_framework_simplejwt.tokens import (
    RefreshToken,
)

from .serializers import (
    UserSerializer,
)


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [
        AllowAny,
    ]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(
            data=request.data
        )
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)

        return Response(
            {
                "status": "success",
                "message": "User registered successfully.",
                "data": serializer.data
            }
        )


class LoginView(generics.GenericAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [
        AllowAny,
    ]

    def post(self, request):
        username: str = request.data.get('username')
        password: str = request.data.get('password')

        user = authenticate(
            username=username,
            password=password
        )

        if user is not None:
            refresh = RefreshToken.for_user(user)

            return Response(
                {
                    "status": "success",
                    "message": "User logged in successfully.",
                    "data": {
                        "refresh": str(refresh),
                        "access": str(refresh.access_token),
                        "user": {
                            "username": user.username,  # type: ignore
                            "email": user.email,  # type: ignore
                        }
                    }
                }
            )

        return Response(
            {
                "status": "error",
                "message": "Invalid Credentials",
            },
            status=401
        )
