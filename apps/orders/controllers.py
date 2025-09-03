from http import HTTPStatus

from django.core.mail.backends.smtp import EmailBackend
from ninja import Query
from ninja_extra import ControllerBase, api_controller, http_post

from apps.inventory.models import InventoryItem
from apps.orders.models import Order, OrderItem
from apps.orders.schemas import OrderCreateSchema, OrderResponseSchema, OrderErrorResponseSchema
from apps.settings.models import EmailSettings
from apps.settings.services import EmailService


@api_controller("/orders")
class OrderController(ControllerBase):

    @http_post("/create", response={
        HTTPStatus.OK: OrderResponseSchema,
        HTTPStatus.BAD_REQUEST: OrderErrorResponseSchema,
    })
    def create_order(self, payload: OrderCreateSchema, lang: str = Query("bg", description="Language code")):
        """Create a new order."""
        items_data = payload.items
        payload_dict = payload.model_dump(exclude_unset=True)
        payload_dict.pop("items", None)

        order = Order.objects.create(**payload_dict)

        item_ids = [item["itemId"] for item in items_data]
        if not item_ids:
            return OrderErrorResponseSchema(detail="No items provided")

        existing_items = InventoryItem.objects.filter(id__in=item_ids)
        if existing_items.count() != len(item_ids):
            return OrderErrorResponseSchema(detail="One or more inventory items do not exist")

        order_items_to_create = []
        for item_data in payload.items:
            inventory_item = existing_items.get(id=item_data["itemId"])
            order_item = OrderItem(
                item=inventory_item,
                quantity=item_data["quantity"],
                order=order,
            )
            order_item.full_clean()
            order_items_to_create.append(order_item)

        OrderItem.objects.bulk_create(order_items_to_create)

        try:
            email_settings = EmailSettings.objects.first()
        except EmailSettings.DoesNotExist:
            return OrderResponseSchema(id=order.id)

        email_backend = EmailBackend(
            host=email_settings.server,
            port=email_settings.port,
            username=email_settings.username,
            password=email_settings.password,
            use_tls=email_settings.tls,
            fail_silently=False
        )

        template_context = {
            "order": order,
            "order_items": order_items_to_create,
            "customer_name": order.customer_full_name,
        }

        EmailService.send_template_email(
            subject=f"Нова поръчка #{order.id}" if lang == "bg" else f"New Order #{order.id}",
            template_path=f"email/create_order_{lang}.html",
            template_context=template_context,
            from_email=email_settings.username,
            recipient_list=[order.email],
            cc=[],
            email_backend=email_backend,
        )

        return OrderResponseSchema(id=order.id)
