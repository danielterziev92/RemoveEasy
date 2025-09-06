import {Globe} from "lucide-react";

import {Button} from "@/components/ui/button.tsx";

import type {LanguageConfigDto} from "@/presentation/dto";

interface LanguageSelectorProps {
    config: LanguageConfigDto;
}

export default function LanguageSelector({config}: LanguageSelectorProps) {
    const {currentLocale, availableLocales, changeLanguage} = config;

    const toggleLanguage = async () => {
        const currentIndex = availableLocales.findIndex(locale =>
            locale.hasCode(currentLocale.code)
        );
        const nextIndex = (currentIndex + 1) % availableLocales.length;
        const nextLocale = availableLocales[nextIndex];

        const result = await changeLanguage(nextLocale.code);

        if (!result.success) {
            console.error('Failed to change language:', result.message);
        }
    };

    const getNextLanguageLabel = () => {
        const currentIndex = availableLocales.findIndex(locale =>
            locale.hasCode(currentLocale.code)
        );
        const nextIndex = (currentIndex + 1) % availableLocales.length;
        const nextLocale = availableLocales[nextIndex];
        return nextLocale.getDisplayLabel();
    };

    return (
        <Button
            variant="outline"
            size="sm"
            onClick={toggleLanguage}
            className="flex items-center gap-1 border-primary text-primary hover:bg-primary hover:text-white"
            aria-label={`Switch to ${getNextLanguageLabel()}`}
        >
            <Globe size={16}/>
            {getNextLanguageLabel()}
        </Button>
    )
}