import type {NavigationFactoryProps} from "@/presentation/types";

import MobileNavigation from "@/components/header/MobileNavigation.tsx";
import DesktopNavigation from "@/components/header/DesktopNavigation.tsx";

export default function NavigationFactory({
                                              isMobile,
                                              navigationItems,
                                              languageConfig,
                                              contactInfo
                                          }: NavigationFactoryProps) {
    if (isMobile) {
        return (
            <MobileNavigation
                navigationItems={navigationItems}
                languageConfig={languageConfig}
                contactInfo={contactInfo}
            />
        );
    }

    return (
        <DesktopNavigation
            navigationItems={navigationItems}
            languageConfig={languageConfig}
            contactInfo={contactInfo}
        />
    );
}
