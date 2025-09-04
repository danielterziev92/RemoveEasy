import {DomainValidationError, LocaleErrorCode} from "@/domain/errors";

export class Locale {
    public static readonly BULGARIAN_CODE = "bg";
    public static readonly ENGLISH_CODE = "en";

    private static readonly VALID_CODES = new Set([
        Locale.BULGARIAN_CODE,
        Locale.ENGLISH_CODE,
    ]);

    public static readonly BG = Locale.create(Locale.BULGARIAN_CODE, "Bulgarian", "Български");
    public static readonly EN = Locale.create(Locale.ENGLISH_CODE, "English", "English");

    public readonly code: string;
    public readonly name: string;
    public readonly nativeName: string;

    private constructor(code: string, name: string, nativeName: string) {
        this.code = code;
        this.name = name;
        this.nativeName = nativeName;
    }

    /**
     * Creates a new Locale instance with validation
     * @param code - Two-letter locale code (ISO 639-1)
     * @param name - English name of the locale
     * @param nativeName - Native name of the locale
     * @returns A new validated Locale instance
     * @throws DomainValidationError if code is invalid
     */
    static create(code: string, name: string, nativeName: string): Locale {
        Locale.validate(code, name, nativeName);

        return new Locale(code.toLowerCase(), name.trim(), nativeName.trim());
    }

    private static validate(code: string, name: string, nativeName: string): void {
        if (!code || code.length !== 2) {
            throw new DomainValidationError(LocaleErrorCode.INVALID_CODE_LENGTH);
        }

        const normalizedCode = code.toLowerCase();
        if (!Locale.VALID_CODES.has(normalizedCode)) {
            throw new DomainValidationError(LocaleErrorCode.UNSUPPORTED_LOCALE);
        }

        if (!name.trim()) {
            throw new DomainValidationError(LocaleErrorCode.NAME_REQUIRED);
        }

        if (!nativeName.trim()) {
            throw new DomainValidationError(LocaleErrorCode.NATIVE_NAME_REQUIRED);
        }
    }

    /**
     * Checks if this locale matches the given code
     * @param code - The locale code to check against
     * @returns true if this locale matches the given code
     */
    hasCode(code: string): boolean {
        return this.code === code.toLowerCase();
    }

    /**
     * Checks if this locale is one of the given codes
     * @param codes - Array of locale codes to check against
     * @returns true if this locale matches any of the given codes
     */
    isOneOf(codes: string[]): boolean {
        return codes.some(code => this.hasCode(code));
    }

    /**
     * Gets the default locale (Bulgarian)
     * @returns The default Bulgarian locale
     */
    static getDefault(): Locale {
        return Locale.BG;
    }

    /**
     * Checks if a locale code is supported
     * @param code - The locale code to check
     * @returns true if the code is supported
     */
    static isSupported(code: string): boolean {
        return Locale.VALID_CODES.has(code.toLowerCase());
    }

    /**
     * Converts the Locale instance to a plain object for serialization
     * @returns A plain object containing all locale properties
     */
    toObject() {
        return {
            code: this.code,
            name: this.name,
            nativeName: this.nativeName
        };
    }
}