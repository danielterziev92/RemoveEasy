from decimal import Decimal

from pydantic import BaseModel, ConfigDict


class MovingServiceSchema(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    icon_class: str
    price_from: Decimal
    currency: str
    title_bg: str | None
    title_en: str | None
    subtitle_bg: str | None
    subtitle_en: str | None
    description_bg: str | None
    description_en: str | None
    button_text_bg: str | None
    button_text_en: str | None
    is_active: bool


class MovingServicesResponseSchema(BaseModel):
    services: list[MovingServiceSchema]
