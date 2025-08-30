import type {ContactInfo, LanguageConfig, NavigationType} from "@/domain/types";
import MobileNavigation from "@/components/header/MobileNavigation.tsx";
import DesktopNavigation from "@/components/header/DesktopNavigation.tsx";

interface NavigationFactoryProps {
    isMobile: boolean;
    navigationTypes: NavigationType[];
    languageConfig: LanguageConfig;
    contactInfo: ContactInfo;
}

export default function NavigationFactory({
                                              isMobile,
                                              navigationTypes,
                                              languageConfig,
                                              contactInfo
                                          }: NavigationFactoryProps) {
    if (isMobile) {
        return (
            <MobileNavigation
                navigationTypes={navigationTypes}
                languageConfig={languageConfig}
                contactInfo={contactInfo}
            />
        );
    }

    return (
        <DesktopNavigation
            navigationTypes={navigationTypes}
            languageConfig={languageConfig}
            contactInfo={contactInfo}
        />
    );
}
