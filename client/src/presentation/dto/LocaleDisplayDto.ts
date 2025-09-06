import {Locale} from "@/domain/value-objects";

export class LocaleDisplayDto {
    public readonly code: string;
    public readonly name: string;
    public readonly nativeName: string;

    private constructor(code: string, name: string, nativeName: string) {
        this.code = code;
        this.name = name;
        this.nativeName = nativeName;
    }

    static fromEntity(locale: Locale): LocaleDisplayDto {
        return new LocaleDisplayDto(
            locale.code,
            locale.name,
            locale.nativeName
        );
    }

    /**
     * Creates a LocaleDisplayDto from raw data
     */
    static create(code: string, name: string, nativeName: string): LocaleDisplayDto {
        return new LocaleDisplayDto(code, name, nativeName);
    }

    /**
     * Gets the display label for language selector
     * Returns the uppercase version of the code (e.g., "BG", "EN")
     */
    getDisplayLabel(): string {
        return this.code.toUpperCase();
    }

    /**
     * Gets the full name for language selector
     */
    getFullName(): string {
        return this.nativeName;
    }

    /**
     * Checks if this locale matches the given code
     */
    hasCode(code: string): boolean {
        return this.code === code.toLowerCase();
    }
}