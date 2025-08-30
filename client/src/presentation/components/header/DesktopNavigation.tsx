import {MessageCircle, Phone} from "lucide-react";

import type {ContactInfo, LanguageConfig, NavigationType} from "@/domain/types";

import {cn} from "@/lib/utils";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList
} from "@/components/ui/navigation-menu.tsx";
import {Button} from "@/components/ui/button.tsx";

import LanguageSelector from "@/components/LanguageSelector.tsx";

interface DesktopNavigationProps {
    navigationTypes: NavigationType[];
    languageConfig: LanguageConfig;
    contactInfo: ContactInfo;
}

export default function DesktopNavigation({
                                              navigationTypes,
                                              languageConfig,
                                              contactInfo
                                          }: DesktopNavigationProps) {
    return (
        <div className="hidden md:flex items-center gap-8">
            <NavigationMenu>
                <NavigationMenuList>
                    {navigationTypes.map((item) => (
                        <NavigationMenuItem key={item.key}>
                            <NavigationMenuLink
                                href={item.href}
                                className={cn(
                                    "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                                )}
                            >
                                {item.label}
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                    ))}
                </NavigationMenuList>
            </NavigationMenu>

            <div className="flex items-center gap-4">
                <LanguageSelector
                    currentLocale={languageConfig.currentLocale}
                    availableLocales={languageConfig.availableLocales}
                    changeLanguage={languageConfig.changeLanguage}
                    getLanguageLabel={languageConfig.getLanguageLabel}
                />

                <Button variant="ghost" size="sm" asChild>
                    <a href={`tel:${contactInfo.phone}`} className="flex items-center gap-1">
                        <Phone className="h-4 w-4"/>
                        <span className="hidden lg:inline">{contactInfo.phone}</span>
                    </a>
                </Button>

                <Button size="sm" asChild>
                    <a href={contactInfo.whatsapp}>
                        <MessageCircle className="h-4 w-4 mr-2"/>
                        WhatsApp
                    </a>
                </Button>
            </div>
        </div>
    );
}
