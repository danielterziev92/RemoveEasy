from django.contrib import admin
from markdownx.admin import MarkdownxModelAdmin

from apps.services.models import MovingService


@admin.register(MovingService)
class MovingServiceAdmin(MarkdownxModelAdmin):
    fieldsets = (
        ("Основна информация", {
            "fields": ("icon_class", "price_from", "currency", "is_active")
        }),
        ("Български", {
            "fields": ("title_bg", "subtitle_bg", "description_bg", "button_text_bg"),
        }),
        ("English", {
            "fields": ("title_en", "subtitle_en", "description_en", "button_text_en"),
        }),
    )

    list_display = ("title", "price_from", "currency", "is_active")
    list_editable = ("is_active",)
