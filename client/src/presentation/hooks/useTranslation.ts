import {useCallback, useEffect} from "react";
import {localizationService, translationService} from "@/shared/di/container.ts";
import {useSelector} from "react-redux";
import type {RootState} from "@/infrastructure/store/store.ts";
import {LocaleDisplayDto} from "@/presentation/dto";

export default function useTranslation() {
    const {currentLocale, isInitialized} = useSelector((state: RootState) => state.localization);

    useEffect(() => {
        translationService.setLocale(currentLocale);
    }, [currentLocale]);

    const t = useCallback((key: string, params?: Record<string, string | number>) => {
        return translationService.t(key, params);
    }, [currentLocale]);

    const changeLanguage = useCallback(async (localeCode: string): Promise<{ success: boolean; message?: string }> => {
        try {
            const availableLocales = localizationService.getAvailableLocales();
            const targetLocale = availableLocales.find(locale => locale.code === localeCode);

            if (!targetLocale) {
                return {
                    success: false,
                    message: `Locale '${localeCode}' is not supported`
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
        return LocaleDisplayDto.fromEntity(locale);
    }, [currentLocale]);

    const getAvailableLocalesDto = useCallback((): LocaleDisplayDto[] => {
        const locales = localizationService.getAvailableLocales();
        return locales.map(locale => LocaleDisplayDto.fromEntity(locale));
    }, []);

    return {
        t,
        currentLocale: getCurrentLocaleDto(),
        availableLocales: getAvailableLocalesDto(),
        changeLanguage,
        isInitialized
    };
};
