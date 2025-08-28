from django.urls import path
from ninja_extra import NinjaExtraAPI

from apps.orders.controllers import OrderController

api = NinjaExtraAPI(
    docs_url="docs/",
)

api.register_controllers(OrderController)

# URL patterns
urlpatterns = [
    path("", api.urls),
]
