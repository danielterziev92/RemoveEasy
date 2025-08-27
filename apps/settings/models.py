from django.db import models


class EmailSettings(models.Model):
    SERVER_MAX_LENGTH = 100
    TLS_DEFAULT_VALUE = False
    USERNAME_MAX_LENGTH = 100
    PASSWORD_MAX_LENGTH = 100

    server = models.CharField(
        max_length=SERVER_MAX_LENGTH,
        null=False,
    )

    port = models.PositiveIntegerField(
        null=False,
    )

    tls = models.BooleanField(
        default=TLS_DEFAULT_VALUE,
    )

    username = models.CharField(
        max_length=USERNAME_MAX_LENGTH,
        null=False,
    )

    password = models.CharField(
        max_length=PASSWORD_MAX_LENGTH,
        null=False,
    )

    def __str__(self):
        return f"SMTP: {self.server} (TLS: {'Yes' if self.tls else 'No'})"

    class Meta:
        db_table = "email_settings"
