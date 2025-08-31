export class LanguageConfig {
    private readonly _currentLocale: string;
    private readonly _availableLocales: string[];
    private readonly _getLanguageLabel: (locale: string) => string;
    private readonly _changeLanguage: (locale: string) => void;

    constructor(
        currentLocale: string,
        availableLocales: string[],
        getLanguageLabel: (locale: string) => string,
        changeLanguage: (locale: string) => void
    ) {
        if (!currentLocale || currentLocale.trim() === '') {
            throw new Error('Current locale cannot be empty');
        }
        if (!availableLocales || availableLocales.length === 0) {
            throw new Error('Available locales cannot be empty');
        }
        if (!availableLocales.includes(currentLocale)) {
            throw new Error('Current locale must be in available locales');
        }

        this._currentLocale = currentLocale;
        this._availableLocales = [...availableLocales];
        this._getLanguageLabel = getLanguageLabel;
        this._changeLanguage = changeLanguage;
    }

    get currentLocale(): string {
        return this._currentLocale;
    }

    get availableLocales(): string[] {
        return [...this._availableLocales];
    }

    get getLanguageLabel(): (locale: string) => string {
        return this._getLanguageLabel;
    }

    get changeLanguage(): (locale: string) => void {
        return this._changeLanguage;
    }

    isLocaleSupported(locale: string): boolean {
        return this._availableLocales.includes(locale);
    }

    equals(other: LanguageConfig): boolean {
        return this._currentLocale === other._currentLocale &&
            this._availableLocales.length === other._availableLocales.length &&
            this._availableLocales.every(locale => other._availableLocales.includes(locale));
    }

    toString(): string {
        return `LanguageConfig(current: ${this._currentLocale}, available: [${this._availableLocales.join(', ')}])`;
    }
}