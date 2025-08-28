from ninja import Schema
from pydantic import BaseModel, Field

from apps.orders.models import Order


class OrderCreateSchema(BaseModel):
    customer_full_name: str = Field(
        max_length=Order.CUSTOMER_FULL_NAME_MAX_LENGTH,
        description="Full name of the customer"
    )

    phone_number: str = Field(
        max_length=Order.PHONE_NUMBER_MAX_LENGTH,
        description="Phone number of the customer"
    )

    email: str = Field(
        description="Email of the customer"
    )

    loading_town: str = Field(
        max_length=Order.LOADING_TOWN_MAX_LENGTH,
        description="Town where the order is loading"
    )

    loading_postal_code: str = Field(
        max_length=Order.LOADING_POSTAL_CODE_MAX_LENGTH,
        description="Postal code of the loading town"
    )

    loading_street: str = Field(
        max_length=Order.LOADING_STREET_MAX_LENGTH,
        description="Street where the order is loading"
    )

    loading_house_number: str = Field(
        max_length=Order.LOADING_HOUSE_NUMBER_MAX_LENGTH,
        description="House number where the order is loading"
    )

    loading_address: str = Field(
        max_length=Order.LOADING_ADDRESS_MAX_LENGTH,
        description="Address where the order is loading"
    )

    unloading_town: str = Field(
        max_length=Order.UNLOADING_TOWN_MAX_LENGTH,
        description="Town where the order is unloading"
    )

    unloading_postal_code: str = Field(
        max_length=Order.UNLOADING_POSTAL_CODE_MAX_LENGTH,
        description="Postal code of the unloading town"
    )

    unloading_street: str = Field(
        max_length=Order.UNLOADING_STREET_MAX_LENGTH,
        description="Street where the order is unloading"
    )

    unloading_house_number: str = Field(
        max_length=Order.UNLOADING_HOUSE_NUMBER_MAX_LENGTH,
        description="House number where the order is unloading"
    )

    unloading_address: str = Field(
        max_length=Order.UNLOADING_ADDRESS_MAX_LENGTH,
        description="Address where the order is unloading"
    )

    description: str = Field(
        description="Description of the order"
    )

    items: list[int] = Field(
        description="List of item IDs to be ordered"
    )


class OrderResponseSchema(Schema):
    id: int
    customer_full_name: str
    phone_number: str
    email: str
    loading_town: str
    loading_postal_code: str
    loading_street: str
    loading_house_number: str
    loading_address: str
    unloading_town: str
    unloading_postal_code: str
    unloading_street: str
    unloading_house_number: str
    unloading_address: str
    description: str
