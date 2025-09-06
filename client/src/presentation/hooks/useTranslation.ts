import {useCallback} from "react";
import {localizationService, translationService} from "@/shared/di/container.ts";
import {useSelector} from "react-redux";
import type {RootState} from "@/infrastructure/store/store.ts";
import {LocaleDisplayDto} from "@/presentation/dto";

export default function useTranslation() {
    const {currentLocale, isInitialized} = useSelector((state: RootState) => state.localization);

    const t = useCallback((key: string, params?: Record<string, string | number>) => {
        return translationService.t(key, params);
    }, []);

    const changeLanguage = useCallback(async (localeCode: string): Promise<{ success: boolean; message?: string }> => {
        try {
            const availableLocales = localizationService.getAvailableLocales();

            const isSupported = availableLocales.some(locale => locale.code === localeCode);

            if (!isSupported) {
                return {
                    success: false,
                    message: `Locale '${localeCode}' is not supported`
                };
            }

            const targetLocale = availableLocales.find(locale => locale.code === localeCode);

            if (!targetLocale) {
                return {
                    success: false,
                    message: `Could not find locale '${localeCode}'`
                };
            }

            localizationService.setCurrentLocale(targetLocale);
            localizationService.saveLocale(targetLocale);

            return {success: true};
        } catch (error) {
            console.error('Error changing language:', error);
            return {
                success: false,
                message: error instanceof Error ? error.message : 'Unknown error occurred'
            };
        }
    }, []);

    const getCurrentLocaleDto = useCallback((): LocaleDisplayDto => {
        const locale = localizationService.getCurrentLocale();
        return {
            code: locale.code,
            name: locale.name,
            nativeName: locale.nativeName,
            getDisplayLabel: () => locale.code.toUpperCase(),
            getFullName: () => locale.nativeName,
            hasCode: (code: string) => locale.code === code.toLowerCase()
        };
    }, [currentLocale]);

    const getAvailableLocalesDto = useCallback((): LocaleDisplayDto[] => {
        const locales = localizationService.getAvailableLocales();
        return locales.map(locale => ({
            code: locale.code,
            name: locale.name,
            nativeName: locale.nativeName,
            getDisplayLabel: () => locale.code.toUpperCase(),
            getFullName: () => locale.nativeName,
            hasCode: (code: string) => locale.code === code.toLowerCase()
        }));
    }, []);

    return {
        t,
        currentLocale: getCurrentLocaleDto(),
        availableLocales: getAvailableLocalesDto(),
        changeLanguage,
        isInitialized
    };
};
