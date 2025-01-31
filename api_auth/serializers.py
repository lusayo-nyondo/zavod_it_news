from typing import (
    Any,
    Dict
)

from django.contrib.auth.models import (
    User,
)

from rest_framework import (  # type: ignore
    serializers
)


class UserSerializer(serializers.ModelSerializer):
    password: serializers.CharField = serializers.CharField(
        write_only=True
    )
    email: serializers.EmailField = serializers.EmailField(
        required=False
    )
    id: serializers.IntegerField = serializers.IntegerField(
        read_only=True
    )
    is_staff: serializers.BooleanField = serializers.BooleanField(
        read_only=True
    )
    is_superuser: serializers.BooleanField = serializers.BooleanField(
        read_only=True
    )

    class Meta:
        model = User
        fields = [
            'id',
            'username',
            'email',
            'is_staff',
            'is_superuser',
            'password',
        ]

    def create(self, validated_data: Dict[str, Any]):
        user = User(
            username=validated_data['username'],
            email=validated_data['email']
        )

        user.set_password(validated_data['password'])
        user.save()

        return user

    def update(self, instance: User, validated_data: Dict[str, Any]):
        instance.username = validated_data.get(
            'username',
            instance.username
        )
        instance.email = validated_data.get(
            'email',
            instance.email
        )

        password = validated_data.get(
            'password',
            None
        )

        if password:
            instance.set_password(password)

        instance.save()
        return instance
