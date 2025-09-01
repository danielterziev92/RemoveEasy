from django.contrib import admin
from markdownx.admin import MarkdownxModelAdmin

from .models import InventorySection, InventoryItem


@admin.register(InventorySection)
class InventorySectionAdmin(MarkdownxModelAdmin):
    fieldsets = (
        ("Основна информация", {
            "fields": ("icon_class",)
        }),
        ("Български", {
            "fields": ("title_bg",)
        }),
        ("English", {
            "fields": ("title_en",)
        }),
    )

    list_display = ("title", "icon_class")
    list_filter = ("title",)
    search_fields = ("title", "icon_class")
    ordering = ("title",)


@admin.register(InventoryItem)
class InventoryItemAdmin(MarkdownxModelAdmin):
    fieldsets = (
        ("Основна информация", {
            "fields": ("icon_class",)
        }),
        ("Български", {
            "fields": ("title_bg",)
        }),
        ("English", {
            "fields": ("title_en",)
        }),
    )

    list_display = ("title", "section", "icon_class")
    list_filter = ("section",)
    search_fields = ("title", "icon_class")
    ordering = ("section", "title")

    autocomplete_fields = ("section",)
