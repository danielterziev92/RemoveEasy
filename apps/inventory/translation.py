from modeltranslation.translator import TranslationOptions, translator

from apps.inventory.models import InventorySection, InventoryItem


class InventorySectionTranslationOptions(TranslationOptions):
    fields = ("title",)


class InventoryItemTranslationOptions(TranslationOptions):
    fields = ("title",)


translator.register(InventorySection, InventorySectionTranslationOptions)
translator.register(InventoryItem, InventoryItemTranslationOptions)
