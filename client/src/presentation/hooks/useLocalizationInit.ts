import {useEffect} from "react";
import {localizationService} from "@/shared/di/container.ts";

export const useLocalizationInit = () => {
    useEffect(() => {
        localizationService.initializeLocale();
    }, []);
};
