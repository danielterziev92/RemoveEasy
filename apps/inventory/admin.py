from django.contrib import admin

from .models import InventorySection, InventoryItem


@admin.register(InventorySection)
class InventorySectionAdmin(admin.ModelAdmin):
    list_display = ("title", "icon_class")
    list_filter = ("title",)
    search_fields = ("title", "icon_class")
    ordering = ("title",)


@admin.register(InventoryItem)
class InventoryItemAdmin(admin.ModelAdmin):
    list_display = ("title", "section", "icon_class")
    list_filter = ("section",)
    search_fields = ("title", "icon_class")
    ordering = ("section", "title")

    autocomplete_fields = ("section",)
