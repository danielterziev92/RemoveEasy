from django.db import models

from apps.inventory.models import InventoryItem
from apps.orders.manager import OrderManager


class Order(models.Model):
    CUSTOMER_FULL_NAME_MAX_LENGTH = 200
    PHONE_NUMBER_MAX_LENGTH = 15
    LOADING_TOWN_MAX_LENGTH = 100
    LOADING_POSTAL_CODE_MAX_LENGTH = 10
    LOADING_STREET_MAX_LENGTH = 200
    LOADING_HOUSE_NUMBER_MAX_LENGTH = 100
    LOADING_ADDRESS_MAX_LENGTH = 200
    UNLOADING_TOWN_MAX_LENGTH = 100
    UNLOADING_POSTAL_CODE_MAX_LENGTH = 10
    UNLOADING_STREET_MAX_LENGTH = 200
    UNLOADING_HOUSE_NUMBER_MAX_LENGTH = 100
    UNLOADING_ADDRESS_MAX_LENGTH = 200

    customer_full_name = models.CharField(
        max_length=CUSTOMER_FULL_NAME_MAX_LENGTH,
        null=False,
    )

    phone_number = models.CharField(
        max_length=PHONE_NUMBER_MAX_LENGTH,
        null=False,
    )

    email = models.EmailField(
        null=False,
    )

    loading_town = models.CharField(
        max_length=LOADING_TOWN_MAX_LENGTH,
        null=False,
    )

    loading_postal_code = models.CharField(
        max_length=LOADING_POSTAL_CODE_MAX_LENGTH,
        null=False,
    )

    loading_street = models.CharField(
        max_length=LOADING_STREET_MAX_LENGTH,
        null=False,
    )

    loading_house_number = models.CharField(
        max_length=LOADING_HOUSE_NUMBER_MAX_LENGTH,
        null=False,
    )

    loading_address = models.CharField(
        max_length=LOADING_ADDRESS_MAX_LENGTH,
        null=False,
    )

    unloading_town = models.CharField(
        max_length=UNLOADING_TOWN_MAX_LENGTH,
        null=False,
    )

    unloading_postal_code = models.CharField(
        max_length=UNLOADING_POSTAL_CODE_MAX_LENGTH,
        null=False,
    )

    unloading_street = models.CharField(
        max_length=UNLOADING_STREET_MAX_LENGTH,
        null=False,
    )

    unloading_house_number = models.CharField(
        max_length=UNLOADING_HOUSE_NUMBER_MAX_LENGTH,
        null=False,
    )

    unloading_address = models.CharField(
        max_length=UNLOADING_ADDRESS_MAX_LENGTH,
        null=False,
    )

    description = models.TextField(
        null=True,
    )

    items = models.ManyToManyField(
        InventoryItem,
        related_name="orders",
        blank=True,
    )

    objects = OrderManager()

    def __str__(self):
        return f"Order #{self.id}"

    class Meta:
        db_table = "orders"
        verbose_name = "Поръчка"
        verbose_name_plural = "Поръчки"
