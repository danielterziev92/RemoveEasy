from decimal import Decimal

from pydantic import BaseModel, ConfigDict


class MovingServiceSchema(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    icon_class: str
    price_from: Decimal
    currency: str
    title_bg: str
    title_en: str
    subtitle_bg: str
    subtitle_en: str
    description_bg: str
    description_en: str
    button_text_bg: str
    button_text_en: str
    is_active: bool


class MovingServicesResponseSchema(BaseModel):
    services: list[MovingServiceSchema]
