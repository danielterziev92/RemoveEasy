import {DomainValidationError, ItemErrorCode} from "@/domain/errors";

/**
 * A value object representing a unique item identifier.
 * Ensures that item IDs are valid positive integers and provides
 * type-safe operations for working with item identifiers.
 */
export class ItemId {
    private readonly _value: number;

    /**
     * Private constructor to enforce creation through static factory methods.
     * @param value - The numeric value for the item ID
     * @throws {DomainValidationError} When the value is less than 1
     */
    private constructor(value: number) {
        if (value < 1) {
            throw new DomainValidationError(ItemErrorCode.ID_INVALID);
        }

        this._value = value;
    }

    /**
     * Creates a new ItemId instance from a numeric value.
     * @param value - The numeric value for the item ID (must be >= 1)
     * @returns A new ItemId instance
     * @throws {DomainValidationError} When the value is less than 1
     */
    static create(value: number): ItemId {
        return new ItemId(value);
    }

    /**
     * Gets the numeric value of the item ID.
     * @returns The numeric value of the item ID
     */
    get value(): number {
        return this._value;
    }

    /**
     * Checks if this ItemId is equal to another ItemId.
     * @param other - The other ItemId to compare with
     * @returns True if both ItemIds have the same value, false otherwise
     */
    equals(other: ItemId): boolean {
        return this._value === other._value;
    }

    /**
     * Converts the ItemId to its string representation.
     * @returns The string representation of the item ID value
     */
    toString(): string {
        return this._value.toString();
    }
}