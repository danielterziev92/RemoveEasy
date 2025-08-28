from django.db import models
from markdownx.models import MarkdownxField


class MovingService(models.Model):
    ICON_CLASS_MAX_LENGTH = 100
    PRICE_FROM_MAX_DIGITS = 6
    PRICE_FROM_DECIMAL_PLACES = 2
    CURRENCY_MAX_LENGTH = 3
    TITLE_MAX_LENGTH = 100
    SUBTITLE_MAX_LENGTH = 100
    BUTTON_TEXT_MAX_LENGTH = 100
    IS_ACTIVE_DEFAULT_VALUE = True

    icon_class = models.CharField(
        max_length=ICON_CLASS_MAX_LENGTH,
        null=False,
        help_text='Класа за икона. Можете да намерите икони на: <a href="https://lucide.dev/icons/" target="_blank">Lucide Icons</a>'
    )

    price_from = models.DecimalField(
        max_digits=PRICE_FROM_MAX_DIGITS,
        decimal_places=PRICE_FROM_DECIMAL_PLACES
    )

    currency = models.CharField(
        max_length=CURRENCY_MAX_LENGTH,
        null=False,
    )

    title = models.CharField(
        max_length=TITLE_MAX_LENGTH,
        null=False,
    )

    subtitle = models.CharField(
        max_length=SUBTITLE_MAX_LENGTH,
        null=False,
    )

    description = MarkdownxField()

    button_text = models.CharField(
        max_length=BUTTON_TEXT_MAX_LENGTH,
        null=False,
    )

    is_active = models.BooleanField(
        default=IS_ACTIVE_DEFAULT_VALUE,
        null=False,
    )

    def __str__(self):
        return self.title

    class Meta:
        db_table = "moving_services"
        verbose_name = "Услуга"
        verbose_name_plural = "Услуги"
