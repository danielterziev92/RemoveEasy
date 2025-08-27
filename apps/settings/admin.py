from django.contrib import admin
from django.contrib.admin import register
from django.contrib import messages
from django.forms import ModelForm

from apps.settings.models import EmailSettings
from apps.settings.services.email_service import EmailService


class EmailSettingsForm(ModelForm):
    class Meta:
        model = EmailSettings
        fields = ['server', 'port', 'tls', 'username', 'password']


@register(EmailSettings)
class EmailSettingsAdmin(admin.ModelAdmin):
    form = EmailSettingsForm
    fields = ['server', 'port', 'tls', 'username', 'password']
    list_display = ['server', 'port', 'tls', 'username']

    def has_add_permission(self, request):
        """
        Prevent adding more than one EmailSettings record.
        """
        return not EmailSettings.objects.exists()

    def has_delete_permission(self, request, obj=None):
        """
        Prevent deletion to ensure at least one record exists if any.
        Allow deletion only if there are multiple records (edge case).
        """
        count = EmailSettings.objects.count()
        return count > 1

    def changelist_view(self, request, extra_context=None):
        """
        Redirect to change view if only one object exists,
        otherwise show the normal changelist.
        """
        if EmailSettings.objects.count() == 1:
            obj = EmailSettings.objects.first()
            from django.shortcuts import redirect
            from django.urls import reverse
            return redirect(reverse('admin:settings_emailsettings_change', args=[obj.pk]))
        return super().changelist_view(request, extra_context)

    def save_model(self, request, obj, form, change):
        """
        Custom save method to test email connection and show toast notification.
        """
        test_result = EmailService.test_email_settings(obj)

        if test_result["success"]:
            super().save_model(request, obj, form, change)
            messages.success(
                request,
                f"Email settings saved successfully! {test_result['message']}"
            )
        else:
            super().save_model(request, obj, form, change)
            error_msg = test_result.get('error', 'Unknown error')
            messages.warning(
                request,
                f"Email settings saved, but connection test failed: {test_result['message']} - {error_msg}"
            )
