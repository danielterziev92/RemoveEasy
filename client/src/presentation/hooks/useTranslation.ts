import {useCallback} from "react";
import {localizationService, translationService} from "@/shared/di/container.ts";
import {useSelector} from "react-redux";
import type {RootState} from "@/infrastructure/store/store.ts";

export default function useTranslation() {
    const {currentLocale, isInitialized} = useSelector((state: RootState) => state.localization);

    const t = useCallback((key: string, params?: Record<string, string | number>) => {
        return translationService.t(key, params);
    }, []);

    const changeLanguage = useCallback((locale: string) => {
        localizationService.setCurrentLocale(locale);
    }, []);

    const availableLocales = localizationService.getAvailableLocales();

    return {
        t,
        currentLocale,
        availableLocales: availableLocales.map(locale => locale.code),
        changeLanguage,
        isInitialized
    };
};
