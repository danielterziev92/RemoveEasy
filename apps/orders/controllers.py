from django.http import JsonResponse
from ninja_extra import ControllerBase, api_controller, http_post

from apps.inventory.models import InventoryItem
from apps.orders.models import Order
from apps.orders.schemas import OrderCreateSchema, OrderResponseSchema


@api_controller("/orders")
class OrderController(ControllerBase):

    @http_post("/create", response=OrderResponseSchema)
    def create_order(self, payload: OrderCreateSchema):
        """Create a new order."""
        # Extract items list from payload
        items_ids = payload.items
        payload_dict = payload.model_dump(exclude_unset=True)

        # Remove items from payload dict as it's handled separately
        payload_dict.pop('items', None)

        # Create the order using the manager
        order = Order.objects.create(**payload_dict)

        # Add items to the order if any provided
        if items_ids:
            # Validate that all item IDs exist
            existing_items = InventoryItem.objects.filter(id__in=items_ids)
            if existing_items.count() != len(items_ids):
                # If some items don't exist, delete the order and raise error
                order.delete()
                return JsonResponse(
                    {"error": "One or more inventory items do not exist"},
                    status=400
                )

            # Add the items to the order
            order.items.set(existing_items)

        # Return the created order
        return OrderResponseSchema(
            id=order.id,
            customer_full_name=order.customer_full_name,
            phone_number=order.phone_number,
            email=order.email,
            loading_town=order.loading_town,
            loading_postal_code=order.loading_postal_code,
            loading_street=order.loading_street,
            loading_house_number=order.loading_house_number,
            loading_address=order.loading_address,
            unloading_town=order.unloading_town,
            unloading_postal_code=order.unloading_postal_code,
            unloading_street=order.unloading_street,
            unloading_house_number=order.unloading_house_number,
            unloading_address=order.unloading_address,
            description=order.description or "",
        )
