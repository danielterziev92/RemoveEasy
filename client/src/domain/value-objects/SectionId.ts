import {DomainValidationError, SectionErrorCode} from "@/domain/errors";

/**
 * A value object representing a unique section identifier.
 * Ensures that section IDs are valid positive integers and provides
 * type-safe operations for working with section identifiers.
 */
export class SectionId {
    private readonly _value: number;

    /**
     * Private constructor to enforce creation through static factory methods.
     * @param value - The numeric value for the section ID
     * @throws {DomainValidationError} When the value is less than 1
     */
    private constructor(value: number) {
        if (value < 1) {
            throw new DomainValidationError(SectionErrorCode.ID_INVALID);
        }

        this._value = value;
    }

    /**
     * Creates a new SectionId instance from a numeric value.
     * @param value - The numeric value for the section ID (must be >= 1)
     * @returns A new SectionId instance
     * @throws {DomainValidationError} When the value is less than 1
     */
    static create(value: number): SectionId {
        return new SectionId(value);
    }

    /**
     * Gets the numeric value of the section ID.
     * @returns The numeric value of the section ID
     */
    get value(): number {
        return this._value;
    }

    /**
     * Checks if this SectionId is equal to another SectionId.
     * @param other - The other SectionId to compare with
     * @returns True if both SectionIds have the same value, false otherwise
     */
    equals(other: SectionId): boolean {
        return this._value === other._value;
    }

    /**
     * Converts the SectionId to its string representation.
     * @returns The string representation of the section ID value
     */
    toString(): string {
        return this._value.toString();
    }
}