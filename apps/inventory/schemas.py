from ninja import Schema


class InventorySectionResponseSchema(Schema):
    id: int
    icon_class: str
    title: str


class InventoryItemResponseSchema(Schema):
    id: int
    icon_class: str
    title: str
    section: InventorySectionResponseSchema


class InventoryItemsResponseSchema(Schema):
    items: list[InventoryItemResponseSchema]