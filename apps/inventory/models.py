from django.db import models


class InventorySection(models.Model):
    TITLE_MAX_LENGTH = 100

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
