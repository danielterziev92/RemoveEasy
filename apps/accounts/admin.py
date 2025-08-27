from django.contrib import admin
from django.contrib.auth import get_user_model
from django.contrib.auth.admin import UserAdmin
from django.utils.translation import gettext_lazy as _

AccountModel = get_user_model()


@admin.register(AccountModel)
class AccountAdmin(UserAdmin):
    list_display = ("email", "is_staff", "is_active", "created_at", "updated_at")
    list_filter = ("is_staff", "is_active", "created_at")
    search_fields = ("email",)
    ordering = ("email",)

    fieldsets = (
        (
            _("General Info"), {"fields": ("email", "password")}
        ),
        (
            _("Permissions"), {
            "fields":
                ("is_active", "is_staff", "is_superuser", "groups", "user_permissions"),
            "classes": ("collapse",),
        }),
        (
            _("Important dates"), {
            "fields": ("last_login", "created_at", "updated_at"),
            "classes": ("collapse",),
        }),
    )

    add_fieldsets = (
        (None, {
            "classes": ("wide",),
            "fields": ("email", "password1", "password2"),
        }),
    )

    readonly_fields = ("created_at", "updated_at", "last_login")

    def has_change_permission(self, request, obj=None):
        """
        Allow staff users to view all accounts, but actual editing is controlled by readonly fields.
        Superusers can edit everything, staff can only edit their own accounts (others are read-only).
        """
        if request.user.is_superuser:
            return True
        return request.user.is_staff

    def has_delete_permission(self, request, obj=None):
        """
        Allow delete permission only if user is superuser or is deleting their own account.
        """
        if request.user.is_superuser:
            return True
        if obj is not None:
            return obj == request.user
        return True

    def get_readonly_fields(self, request, obj=None):
        """
        Make fields read-only for non-owners and non-superusers.
        """
        readonly_fields = list(self.readonly_fields)

        if not request.user.is_superuser and obj is not None and obj != request.user:
            readonly_fields.extend([
                "email", "is_active", "is_staff", "is_superuser",
                "groups", "user_permissions"
            ])

        return readonly_fields

    def get_fieldsets(self, request, obj=None):
        """
        Customize fieldsets based on user permissions.
        """
        if not obj:
            return self.add_fieldsets

        if not request.user.is_superuser and obj != request.user:
            return (
                (None, {"fields": ("email",)}),
                (_("Status"), {"fields": ("is_active", "is_staff")}),
                (_("Important dates"), {"fields": ("last_login", "created_at", "updated_at")}),
            )

        return super().get_fieldsets(request, obj)
