from django.db import models

from apps.inventory.models import InventoryItem
from apps.orders.query_set import OrderQuerySet


class OrderManager(models.Manager):
    """Custom Manager for an Order model with data validation and field truncation."""

    def get_queryset(self):
        """Return custom QuerySet."""
        return OrderQuerySet(self.model, using=self._db)

    def get_inventory_items(self):
        """Get all InventoryItems related to any order."""
        return self.get_queryset().get_inventory_items()

    def get_inventory_item_ids(self):
        """Get IDs of all InventoryItems related to any order."""
        return self.get_queryset().get_inventory_item_ids()

    @staticmethod
    def get_all_inventory_item_ids():
        """Get IDs of all InventoryItems in the system."""
        return InventoryItem.objects.values_list('id', flat=True)

    def _truncate_field(self, value, max_length):
        """Truncate field value from the left if it exceeds max_length."""
        if value and len(value) > max_length:
            return value[-max_length:]
        return value

    def _validate_and_truncate_data(self, **kwargs):
        """Validate and truncate data fields based on model constraints."""
        # Define field max lengths from the model
        field_limits = {
            'customer_full_name': self.model.CUSTOMER_FULL_NAME_MAX_LENGTH,
            'phone_number': self.model.PHONE_NUMBER_MAX_LENGTH,
            'loading_town': self.model.LOADING_TOWN_MAX_LENGTH,
            'loading_postal_code': self.model.LOADING_POSTAL_CODE_MAX_LENGTH,
            'loading_street': self.model.LOADING_STREET_MAX_LENGTH,
            'loading_house_number': self.model.LOADING_HOUSE_NUMBER_MAX_LENGTH,
            'loading_address': self.model.LOADING_ADDRESS_MAX_LENGTH,
            'unloading_town': self.model.UNLOADING_TOWN_MAX_LENGTH,
            'unloading_postal_code': self.model.UNLOADING_POSTAL_CODE_MAX_LENGTH,
            'unloading_street': self.model.UNLOADING_STREET_MAX_LENGTH,
            'unloading_house_number': self.model.UNLOADING_HOUSE_NUMBER_MAX_LENGTH,
            'unloading_address': self.model.UNLOADING_ADDRESS_MAX_LENGTH,
        }

        # Truncate fields that exceed their maximum length
        for field_name, max_length in field_limits.items():
            if field_name in kwargs:
                kwargs[field_name] = self._truncate_field(kwargs[field_name], max_length)

        return kwargs

    def create(self, **kwargs):
        """Create a new Order with validated and truncated data."""
        kwargs = self._validate_and_truncate_data(**kwargs)
        return super().create(**kwargs)

    def bulk_create(self, objs, **kwargs):
        """Bulk create Orders with validated and truncated data."""
        for obj in objs:
            # Get field values as dict
            field_values = {}
            for field in self.model._meta.fields:
                if hasattr(obj, field.name):
                    field_values[field.name] = getattr(obj, field.name)

            # Validate and truncate
            validated_values = self._validate_and_truncate_data(**field_values)

            # Set back to object
            for field_name, value in validated_values.items():
                setattr(obj, field_name, value)

        return super().bulk_create(objs, **kwargs)
