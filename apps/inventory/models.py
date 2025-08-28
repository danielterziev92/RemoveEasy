from django.db import models


class InventorySection(models.Model):
    ICON_CLASS_MAX_LENGTH = 100
    TITLE_MAX_LENGTH = 100

    icon_class = models.CharField(
        max_length=ICON_CLASS_MAX_LENGTH,
        null=False
    )

    title = models.CharField(
        max_length=TITLE_MAX_LENGTH,
        null=False,
    )

    def __str__(self):
        return self.title

    class Meta:
        db_table = "inventory_sections"
        verbose_name = "Инвентар Секция"
        verbose_name_plural = "Инвентар Секции"


class InventoryItem(models.Model):
    ICON_CLASS_MAX_LENGTH = 100
    TITLE_MAX_LENGTH = 100

    icon_class = models.CharField(
        max_length=ICON_CLASS_MAX_LENGTH,
        null=False
    )

    title = models.CharField(
        max_length=TITLE_MAX_LENGTH,
        null=False,
    )

    section = models.ForeignKey(
        InventorySection,
        on_delete=models.CASCADE,
        related_name="items",
    )

    def __str__(self):
        return self.title

    class Meta:
        db_table = "inventory_items"
        verbose_name = "Инвентар Предмет"
        verbose_name_plural = "Инвентар Предмети"
