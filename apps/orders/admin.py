from django.contrib import admin

from .models import Order, OrderItem


class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 0
    fields = ('item', 'quantity')
    autocomplete_fields = ('item',)


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'customer_full_name',
        'phone_number',
        'email',
        'loading_town',
        'unloading_town',
        'status',
        'items_count',
    )

    list_filter = (
        'status',
        'loading_town',
        'unloading_town',
        'loading_postal_code',
        'unloading_postal_code',
    )

    search_fields = (
        'customer_full_name',
        'phone_number',
        'email',
        'loading_town',
        'unloading_town',
    )

    ordering = ('customer_full_name',)
    readonly_fields = ('id',)

    fieldsets = (
        ("Order Information", {
            "fields": ("id", "status")
        }),
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
        ("Additional Details (Optional)", {
            "fields": ("description",),
            "classes": ("collapse",),
        }),
    )

    inlines = [OrderItemInline]

    def items_count(self, obj):
        return obj.order_items.count()

    items_count.short_description = "Items Count"
