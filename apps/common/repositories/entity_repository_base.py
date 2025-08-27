from abc import ABC, abstractmethod
from typing import Any


class EntityRepositoryBase[T](ABC):
    """
    Abstract base repository for basic CRUD operations on any type of entity.
    Provides a unified interface for data access regardless of the underlying storage.
    """

    @abstractmethod
    def list_all(self) -> list[T]:
        """
        Retrieves all entities.

        Returns:
            List of all entities
        """

    @abstractmethod
    def list_paginated(
            self,
            page: int = 1,
            page_size: int = 20,
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
        pass

    @abstractmethod
    def get_by_id(self, entity_id: int) -> T:
        """
        Retrieves an entity by ID.

        Args:
            entity_id: ID of the entity

        Returns:
            The entity with the specified ID

        Raises:
            ValueError: If the entity with the given ID does not exist
        """

    @abstractmethod
    def get_by_field(self, field_name: str, field_value: Any) -> T:
        """
        Retrieves an entity by the value of a specific field.

        Args:
            field_name: Name of the field
            field_value: Value of the field

        Returns:
            The entity matching the field value

        Raises:
            ValueError: If no entity with the specified field value exists
        """

    @abstractmethod
    def exists(self, **filters) -> bool:
        """
        Checks if an entity matching the filters exists.

        Args:
            **filters: Field-value pairs for filtering

        Returns:
            True if at least one matching entity exists, False otherwise
        """

    @abstractmethod
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

    @abstractmethod
    def update_by_id(self, entity_id: int, **fields) -> T:
        """Updates an entity by its ID."""

    @abstractmethod
    def update_entity(self, entity: T, **fields) -> T:
        """Updates an entity instance."""

    @abstractmethod
    def delete_by_id(self, entity_id: int) -> bool:
        """Deletes an entity by its ID."""

    @abstractmethod
    def delete_entity(self, entity: T) -> bool:
        """Deletes an entity instance."""
