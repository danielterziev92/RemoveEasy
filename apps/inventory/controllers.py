from django.db.models import Prefetch
from ninja_extra import ControllerBase, api_controller, http_get

from apps.inventory.models import InventoryItem, InventorySection
from apps.inventory.schemas import InventorySectionsResponseSchema


@api_controller("/inventory")
class InventoryController(ControllerBase):

    @http_get("/items", response=InventorySectionsResponseSchema)
    def get_all_items(self):
        """Get all inventory items sorted by section title in ascending order."""
        sections = InventorySection.objects.prefetch_related(
            Prefetch("items", queryset=InventoryItem.objects.all())
        ).order_by("title")

        # Convert to response format
        sections_data = []
        for section in sections:
            section_items = []
            for item in section.items.all():
                section_items.append({
                    'id': item.id,
                    'icon_class': item.icon_class,
                    'title_bg': item.title_bg,  # type: ignore
                    'title_en': item.title_en,  # type: ignore
                })

            sections_data.append({
                'icon_class': section.icon_class,
                'title_bg': section.title_bg,  # type: ignore
                'title_en': section.title_en,  # type: ignore
                'items': section_items
            })
        return InventorySectionsResponseSchema(sections=sections_data)
