import {useEffect, useState} from "react";

import {cn} from "@/lib/utils";

import Logo from "@/components/Logo.tsx";
import NavigationFactory from "@/components/header/NavigationFactory.tsx";

import {headerContainer} from "@/shared/di/headerContainer";

import useTranslation from "@/hooks/useTranslation";
import useIsMobile from "@/hooks/useIsMobile";

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const {t, currentLocale, availableLocales, changeLanguage} = useTranslation();
    const isMobile = useIsMobile();
    const headerViewService = headerContainer.headerViewService;

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) return setIsScrolled(true);
            setIsScrolled(false);
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const NavigationItems = headerViewService.getNavigationItems(t);
    const contactInfo = headerViewService.getContactInfo();
    const languageConfig = headerViewService.createLanguageConfig(
        currentLocale,
        availableLocales,
        changeLanguage
    );

    return (
        <header
            className={cn(
                "fixed w-full top-0 z-40 transition-all duration-300",
                isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-3'
            )}
        >
            <div className="container-custom flex items-center justify-between">
                <Logo t={t}/>

                <NavigationFactory
                    isMobile={isMobile}
                    navigationItems={NavigationItems}
                    languageConfig={languageConfig}
                    contactInfo={contactInfo}
                />
            </div>
        </header>
    );
}