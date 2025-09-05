import {DomainValidationError} from "@/domain/errors";

export class LanguageConfig {
    private readonly _currentLocale: string;
    private readonly _availableLocales: string[];

    constructor(
        currentLocale: string,
        availableLocales: string[],
    ) {
        this.validate(currentLocale, availableLocales);

        this._currentLocale = currentLocale;
        this._availableLocales = [...availableLocales];
    }

    private validate(currentLocale: string, availableLocales: string[]): void {
        if (!currentLocale || currentLocale.trim() === '') {
            throw new DomainValidationError('Current locale cannot be empty');
        }
        if (!availableLocales || availableLocales.length === 0) {
            throw new DomainValidationError('Available locales cannot be empty');
        }
        if (!availableLocales.includes(currentLocale)) {
            throw new DomainValidationError('Current locale must be in available locales');
        }
    }

    get currentLocale(): string {
        return this._currentLocale;
    }

    get availableLocales(): string[] {
        return [...this._availableLocales];
    }

    isLocaleSupported(locale: string): boolean {
        return this._availableLocales.includes(locale);
    }

    withCurrentLocale(newLocale: string): LanguageConfig {
        return new LanguageConfig(newLocale, this._availableLocales);
    }

    withAvailableLocales(newAvailableLocales: string[]): LanguageConfig {
        return new LanguageConfig(this._currentLocale, newAvailableLocales);
    }

    equals(other: LanguageConfig): boolean {
        return this._currentLocale === other._currentLocale &&
            this._availableLocales.length === other._availableLocales.length &&
            this._availableLocales.every(locale => other._availableLocales.includes(locale));
    }

    toString(): string {
        return `LanguageConfig(current: ${this._currentLocale}, available: [${this._availableLocales.join(', ')}])`;
    }

    toObject(): {
        currentLocale: string;
        availableLocales: string[];
    } {
        return {
            currentLocale: this._currentLocale,
            availableLocales: [...this._availableLocales]
        };
    }
}