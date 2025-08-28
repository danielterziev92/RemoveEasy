from ninja_extra import ControllerBase, api_controller, http_get

from apps.inventory.models import InventoryItem
from apps.inventory.schemas import InventoryItemsResponseSchema


@api_controller("/inventory")
class InventoryController(ControllerBase):

    @http_get("/items", response=InventoryItemsResponseSchema)
    def get_all_items(self):
        """Get all inventory items sorted by section title in ascending order."""
        # Query all items with their sections, ordered by section title
        items = InventoryItem.objects.select_related('section').order_by('section__title')

        # Convert to response format
        items_data = []
        for item in items:
            items_data.append({
                'id': item.id,
                'icon_class': item.icon_class,
                'title': item.title,
                'section': {
                    'id': item.section.id,
                    'icon_class': item.section.icon_class,
                    'title': item.section.title,
                }
            })

        return InventoryItemsResponseSchema(items=items_data)
