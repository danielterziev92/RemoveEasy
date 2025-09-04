import * as LucideIcons from 'lucide-react';
import {DomainValidationError, IconErrorCode} from "@/domain/errors";

export class IconClass {
    private readonly _value: string;

    private constructor(value: string) {
        this._value = value;
    }

    /**
     * Creates a new IconClass instance with validation against lucide-react icons
     * @param value - The icon class name (e.g., 'Users', 'Home', 'Settings')
     * @returns A new validated IconClass instance
     * @throws {DomainValidationError} if the icon doesn't exist in lucide-react
     */
    static create(value: string): IconClass {
        IconClass.validate(value);

        return new IconClass(value.trim());
    }

    /**
     * Validates that the icon class exists in lucide-react
     * @param value - The icon class name to validate
     * @throws {DomainValidationError} if validation fails
     */
    private static validate(value: string): void {
        const trimmedValue = value.trim();

        if (!trimmedValue) {
            throw new DomainValidationError(IconErrorCode.ICON_REQUIRED);
        }

        if (!(trimmedValue in LucideIcons)) {
            throw new DomainValidationError(IconErrorCode.ICON_NOT_FOUND);
        }
    }

    /**
     * Gets all available lucide-react icon names
     * @returns Array of available icon names
     */
    static getAvailableIcons(): string[] {
        return Object.keys(LucideIcons).filter(key =>
            key !== 'createLucideIcon' && // Filter out utility functions
            key !== 'default' &&
            typeof LucideIcons[key as keyof typeof LucideIcons] === 'function'
        );
    }

    /**
     * Checks if an icon name is valid without throwing an error
     * @param iconName - The icon name to check
     * @returns true if the icon exists, false otherwise
     */
    static isValid(iconName: string): boolean {
        try {
            IconClass.validate(iconName);
            return true;
        } catch {
            return false;
        }
    }

    /**
     * Gets the string value of the icon class
     */
    get value(): string {
        return this._value;
    }

    /**
     * Gets the actual React component for this icon
     * @returns The lucide-react icon component
     */
    getComponent() {
        return LucideIcons[this._value as keyof typeof LucideIcons];
    }

    /**
     * Compares two IconClass instances for equality
     * @param other - The other IconClass to compare with
     * @returns true if both have the same value
     */
    equals(other: IconClass): boolean {
        return this._value === other._value;
    }

    /**
     * Returns the string representation
     */
    toString(): string {
        return this._value;
    }
}