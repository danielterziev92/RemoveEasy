from ninja import Schema


class InventoryItemInSectionSchema(Schema):
    id: int
    icon_class: str
    title_bg: str
    title_en: str


class InventorySectionWithItemsSchema(Schema):
    id: int
    icon_class: str
    title_bg: str
    title_en: str
    items: list[InventoryItemInSectionSchema]


class InventorySectionsResponseSchema(Schema):
    sections: list[InventorySectionWithItemsSchema]
