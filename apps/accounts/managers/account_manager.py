from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.hashers import make_password


class AccountAppManager(BaseUserManager):
    use_in_migrations = True
    SUPERUSER_REQUIRED_FIELDS = ("is_staff", "is_superuser", "is_active")

    def _create_account(self, email, password, **extra_fields):
        """Create and save an account with the given email and password."""
        if not email:
            raise ValueError("Email is required")

        email = self.normalize_email(email)
        account = self.model(email=email, **extra_fields)
        account.password = make_password(password)
        account.full_clean()
        account.save(using=self._db)
        return account

    def create_account(self, email, password, **extra_fields):
        from apps.accounts.models import Account

        return self._create_account(
            email=email, password=password,
            **{**self.__prepare_extra_fields(is_active=Account.IS_ACTIVE_DEFAULT_VALUE), **extra_fields}
        )

    def create_super_account(self, email=None, password=None, **extra_fields):
        superuser_defaults = {field: True for field in self.SUPERUSER_REQUIRED_FIELDS}

        for field, value in self.__prepare_extra_fields(**superuser_defaults).items():
            extra_fields.setdefault(field, value)

        for field in self.SUPERUSER_REQUIRED_FIELDS:
            if not extra_fields.get(field):
                raise ValueError(f"Superuser must have {field}=True.")

        return self._create_account(email, password, **extra_fields)

    def update_account(self, account, **extra_fields):
        for field, value in extra_fields.items():
            setattr(account, field, value)
        account.full_clean()
        account.save(using=self._db)
        return account

    @staticmethod
    def delete_account(account):
        account.delete()

    @staticmethod
    def __prepare_extra_fields(
            is_staff: bool = False,
            is_superuser: bool = False,
            is_active: bool = False
    ) -> dict[str, bool]:
        return {"is_staff": is_staff, "is_superuser": is_superuser, "is_active": is_active}
