export interface LanguageConfigDto {
    currentLocale: string;
    availableLocales: string[];
    getLanguageLabel: (locale: string) => string;
    changeLanguage: (locale: string) => void;
}