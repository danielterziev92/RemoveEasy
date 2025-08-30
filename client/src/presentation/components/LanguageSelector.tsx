import {Globe} from "lucide-react";

import {Button} from "@/components/ui/button.tsx";

interface LanguageSelectorProps {
    currentLocale: string;
    availableLocales: string[];
    changeLanguage: (locale: string) => void;
    getLanguageLabel: (locale: string) => string;
}

export default function LanguageSelector({
                                             currentLocale,
                                             availableLocales,
                                             changeLanguage,
                                             getLanguageLabel
                                         }: LanguageSelectorProps) {
    const toggleLanguage = () => {
        const currentIndex = availableLocales.indexOf(currentLocale);
        const nextIndex = (currentIndex + 1) % availableLocales.length;
        const nextLocale = availableLocales[nextIndex];
        changeLanguage(nextLocale);
    };

    const getNextLanguageLabel = () => {
        const currentIndex = availableLocales.indexOf(currentLocale);
        const nextIndex = (currentIndex + 1) % availableLocales.length;
        const nextLocale = availableLocales[nextIndex];
        return getLanguageLabel(nextLocale);
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