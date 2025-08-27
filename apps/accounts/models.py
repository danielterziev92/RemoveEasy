from django.contrib.auth import models as auth_models
from django.db import models

from apps.accounts.managers import AccountAppManager
from apps.common.models.timestamp import TimeStampModel


class Account(auth_models.AbstractBaseUser, auth_models.PermissionsMixin, TimeStampModel):
    IS_STAFF_DEFAULT_VALUE = False
    IS_ACTIVE_DEFAULT_VALUE = True

    email = models.EmailField(
        unique=True,
        null=False,
    )

    is_staff = models.BooleanField(
        default=IS_STAFF_DEFAULT_VALUE,
        null=False,
    )

    is_active = models.BooleanField(
        default=IS_ACTIVE_DEFAULT_VALUE,
        null=False,
    )

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []
    EMAIL_FIELD = "email"

    objects = AccountAppManager()

    class Meta:
        db_table = "accounts"
        indexes = (
            models.Index(fields=("email",)),
        )
        verbose_name = "Акаунт"
        verbose_name_plural = "Акаунти"

    def __str__(self):
        return self.email
