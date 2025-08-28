from django.db import models

from apps.inventory.models import InventoryItem


class OrderQuerySet(models.QuerySet):
    """Custom QuerySet for an Order model with InventoryItem operations."""

    def get_inventory_items(self):
        """Get all InventoryItems related to orders in this queryset."""
        return InventoryItem.objects.filter(orders__in=self)

    def get_inventory_item_ids(self):
        """Get IDs of all InventoryItems related to orders in this queryset."""
        return self.get_inventory_items().values_list('id', flat=True)

    @staticmethod
    def get_all_inventory_item_ids():
        """Get IDs of all InventoryItems in the system."""
        return InventoryItem.objects.values_list('id', flat=True)
