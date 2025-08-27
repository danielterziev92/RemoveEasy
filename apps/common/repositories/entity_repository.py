import logging
from typing import Any

from django.core.paginator import Paginator
from django.db import transaction
from django.db.models import Model, QuerySet
from django.db.utils import OperationalError
from tenacity import retry, stop_after_attempt, wait_exponential, retry_if_exception_type, before_sleep_log

from apps.common.repositories.entity_repository_base import EntityRepositoryBase

logger = logging.getLogger(__name__)


class EntityRepository[T: Model](EntityRepositoryBase[T]):
    """
    Concrete implementation of EntityRepositoryBase using Django ORM.
    Provides atomic database operations with deadlock retry mechanisms.
    """

    # Pagination constants
    PAGE_DEFAULT_VALUE = 1
    PAGE_SIZE_DEFAULT_VALUE = 20
    PAGE_MAX_SIZE = 100

    # Error messages
    PAGE_INVALID_NUMBER_MSG = f"Page number must be greater than or equal to {PAGE_DEFAULT_VALUE}"
    PAGE_SIZE_INVALID_MSG = f"Page size must be greater than or equal to {PAGE_SIZE_DEFAULT_VALUE}"
    MODEL_CLASS_NONE_MSG = "Model class cannot be None"
    MODEL_CLASS_INVALID_MSG = "Model class must be a subclass of Django's Model"

    # Retry configuration
    MAX_RETRY_ATTEMPTS = 3
    RETRY_WAIT_MULTIPLIER = 1
    MIN_RETRY_WAIT_SECONDS = 0.1
    MAX_RETRY_WAIT_SECONDS = 2.0

    db_retry = retry(
        stop=stop_after_attempt(MAX_RETRY_ATTEMPTS),
        wait=wait_exponential(multiplier=RETRY_WAIT_MULTIPLIER, min=MIN_RETRY_WAIT_SECONDS, max=MAX_RETRY_WAIT_SECONDS),
        retry=retry_if_exception_type(OperationalError),
        before_sleep=before_sleep_log(logger, logging.ERROR),
        reraise=True
    )

    def __init__(self, model_class: type[T]):
        """
        Initialize the repository with a Django model class.

        Args:
            model_class: The Django model class to operate on
        """
        self.__model_class = None

        self.model_class = model_class

    @db_retry
    @transaction.atomic
    def list_all(self) -> list[T]:
        """
        Retrieves all entities.

        Returns:
            List of all entities
        """

        return list(self.model_class.objects.all())

    @db_retry
    @transaction.atomic
    def list_paginated(
            self,
            page: int = PAGE_DEFAULT_VALUE,
            page_size: int = PAGE_SIZE_DEFAULT_VALUE,
            ordering: list[str] = None,
            filters: dict[str, Any] = None
    ) -> tuple[list[T], int]:
        """
        Retrieves a paginated and sorted list of entities with optional filtering.

        Args:
            page: Page number (1-indexed)
            page_size: Number of items per page
            ordering: List of fields to sort by (with optional - prefix for descending order)
            filters: Dictionary of field-value pairs for filtering

        Returns:
            Tuple containing (a list of entities for the requested page, total count of filtered entities)
        """

        self._validate_pagination_params(page, page_size)

        page_size = min(page_size, self.PAGE_MAX_SIZE)

        queryset = self._build_queryset(ordering, filters)

        total_count = queryset.count()

        paginator = Paginator(queryset, page_size)
        page_obj = paginator.get_page(page)

        return list(page_obj), total_count

    @db_retry
    @transaction.atomic
    def get_by_id(self, entity_id: int) -> T:
        """
        Retrieves an entity by ID.

        Args:
            entity_id: ID of the entity

        Returns:
            The entity with the specified ID

        Raises:
            ObjectDoesNotExist: If the entity with the given ID does not exist
        """

        return self.model_class.objects.get(pk=entity_id)

    @db_retry
    @transaction.atomic
    def get_by_field(self, field_name: str, field_value: Any) -> T:
        """
        Retrieves an entity by the value of a specific field.

        Args:
            field_name: Name of the field
            field_value: Value of the field

        Returns:
            The entity matching the field value

        Raises:
            ObjectDoesNotExist: If no entity with the specified field value exists
        """

        return self.model_class.objects.get(**{field_name: field_value})

    @db_retry
    @transaction.atomic
    def exists(self, **filters) -> bool:
        """
        Checks if an entity matching the filters exists.

        Args:
            **filters: Field-value pairs for filtering

        Returns:
            True if at least one matching entity exists, False otherwise
        """

        return self.model_class.objects.filter(**filters).exists()

    @db_retry
    @transaction.atomic
    def create(self, **fields) -> T:
        """
        Creates a new entity.

        Args:
            **fields: Field-value pairs for the new entity

        Returns:
            The created entity

        Raises:
            ValueError: If entity creation fails due to validation errors
        """

        entity = self.model_class(**fields)
        entity.full_clean()
        entity.save()
        return entity

    @db_retry
    @transaction.atomic
    def update_by_id(self, entity_id: int, **fields) -> T:
        """
        Updates an entity by its ID.

        Args:
            entity_id: ID of the entity to update
            **fields: Field-value pairs to update

        Returns:
            The updated entity

        Raises:
            ValueError: If the entity with the given ID does not exist
        """

        entity = self.model_class.objects.get(pk=entity_id)

        for field_name, field_value in fields.items():
            setattr(entity, field_name, field_value)

        entity.full_clean()
        entity.save()
        return entity

    @db_retry
    @transaction.atomic
    def update_entity(self, entity: T, **fields) -> T:
        """
        Updates an entity instance.

        Args:
            entity: The entity instance to update
            **fields: Field-value pairs to update

        Returns:
            The updated entity

        Raises:
            ValueError: If entity update fails due to validation errors
        """
        for field_name, field_value in fields.items():
            setattr(entity, field_name, field_value)

        entity.full_clean()
        entity.save()
        return entity

    @db_retry
    @transaction.atomic
    def delete_by_id(self, entity_id: int) -> bool:
        """
        Deletes an entity by its ID.

        Args:
            entity_id: ID of the entity to delete

        Returns:
            True if the entity was deleted, False if it didn't exist
        """

        try:
            entity = self.model_class.objects.get(pk=entity_id)
            entity.delete()
            return True
        except self.model_class.DoesNotExist:
            return False

    @db_retry
    @transaction.atomic
    def delete_entity(self, entity: T) -> bool:
        """
        Deletes an entity instance.

        Args:
            entity: The entity instance to delete

        Returns:
            True if the entity was deleted successfully
        """
        try:
            entity.delete()
            return True
        except self.model_class.DoesNotExist:
            return False

    def _validate_pagination_params(self, page: int, page_size: int):
        if page < 1:
            raise ValueError(self.PAGE_INVALID_NUMBER_MSG)

        if page_size < 1:
            raise ValueError(self.PAGE_SIZE_INVALID_MSG)

    def _build_queryset(self, ordering: list[str] = None, filters: dict[str, Any] = None) -> QuerySet[T]:
        queryset = self.model_class.objects.all()

        if filters:
            queryset = queryset.filter(**filters)

        if ordering:
            queryset = queryset.order_by(*ordering)
        else:
            queryset = queryset.order_by('pk')

        return queryset

    @property
    def model_class(self) -> type[T]:
        return self.__model_class

    @model_class.setter
    def model_class(self, value: type[T]):
        if value is None:
            raise ValueError(self.MODEL_CLASS_NONE_MSG)

        if not issubclass(value, Model):
            raise ValueError(self.MODEL_CLASS_INVALID_MSG)

        self.__model_class = value
