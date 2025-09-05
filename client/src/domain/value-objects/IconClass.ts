import {DomainValidationError, IconErrorCode} from "@/domain/errors";
import type {IconValidator} from "@/domain/validators";

export class IconClass {
    private readonly _value: string;

    private constructor(value: string) {
        this._value = value;
    }

    /**
     * Creates a new IconClass instance with validation against lucide-react icons
     * @param value - The icon class name (e.g., 'Users', 'Home', 'Settings')
     * @param validator
     * @returns A new validated IconClass instance
     * @throws {DomainValidationError} if the icon doesn't exist in lucide-react
     */
    static create(value: string, validator: IconValidator): IconClass {
        IconClass.validate(value, validator);

        return new IconClass(value.trim());
    }

    /**
     * Validates that the icon class exists in lucide-react
     * @param value - The icon class name to validate
     * @param validator
     * @throws {DomainValidationError} if validation fails
     */
    private static validate(value: string, validator: IconValidator): void {
        const trimmedValue = value.trim();

        if (!trimmedValue) throw new DomainValidationError(IconErrorCode.ICON_REQUIRED);

        if (!validator.isValid(trimmedValue)) throw new DomainValidationError(IconErrorCode.ICON_NOT_FOUND);
    }

    get value(): string {
        return this._value;
    }

    equals(other: IconClass): boolean {
        return this._value === other._value;
    }

    toString(): string {
        return this._value;
    }
}