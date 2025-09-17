from django.contrib import admin
from django.urls import path, include
from ninja_extra import NinjaExtraAPI

from apps.inventory.controllers import InventoryController
from apps.orders.controllers import OrderController
from apps.services.controllers import ServicesController

api = NinjaExtraAPI(
    docs_url="docs/",
)

api.register_controllers(OrderController)
api.register_controllers(InventoryController)
api.register_controllers(ServicesController)

urlpatterns = [
    path("admin/", admin.site.urls),
    path('markdownx/', include("markdownx.urls")),
    path('api/', api.urls),
]
