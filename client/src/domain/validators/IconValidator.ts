export interface IconValidator {
    isValid(iconClass: string): boolean;

    getAvailableIcons(): string[];
}