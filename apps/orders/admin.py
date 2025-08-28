from django.contrib import admin

from .models import Order


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = (
        "customer_full_name",
        "phone_number", 
        "email",
        "loading_town",
        "unloading_town",
        "items_count",
    )
    
    list_filter = (
        "loading_town",
        "unloading_town",
        "loading_postal_code",
        "unloading_postal_code",
    )
    
    search_fields = (
        "customer_full_name",
        "phone_number",
        "email",
        "loading_town",
        "unloading_town",
    )
    
    ordering = ("-id",)
    
    fieldsets = (
        ("Customer Information", {
            "fields": ("customer_full_name", "phone_number", "email")
        }),
        ("Loading Address", {
            "fields": (
                "loading_town",
                "loading_postal_code", 
                "loading_street",
                "loading_house_number",
                "loading_address"
            )
        }),
        ("Unloading Address", {
            "fields": (
                "unloading_town",
                "unloading_postal_code",
                "unloading_street", 
                "unloading_house_number",
                "unloading_address"
            )
        }),
        ("Order Details", {
            "fields": ("description", "items")
        }),
    )
    
    filter_horizontal = ("items",)
    
    def items_count(self, obj):
        return obj.items.count()
    items_count.short_description = "Items Count"
