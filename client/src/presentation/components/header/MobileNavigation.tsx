import {useState} from "react";
import {Menu, MessageCircle, Phone} from "lucide-react";

import type {NavigationProps} from "@/presentation/types";

import {Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger} from "@/components/ui/sheet.tsx";
import {Button} from "@/components/ui/button.tsx";
import LanguageSelector from "../LanguageSelector";


export default function MobileNavigation({
                                             navigationItems,
                                             languageConfig,
                                             contactInfo
                                         }: NavigationProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleMenuItemClick = () => {
        setIsMenuOpen(false);
    };

    return (
        <div className="md:hidden">
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                <SheetTrigger asChild>
                    <Button variant="ghost" size="sm" className="z-20">
                        <Menu className="h-6 w-6"/>
                        <span className="sr-only">Отвори меню</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                    <SheetHeader className="pb-4">
                        <SheetTitle>Навигация</SheetTitle>
                    </SheetHeader>

                    <div className="space-y-6">
                        <div className="border-b pb-4">
                            <LanguageSelector
                                currentLocale={languageConfig.currentLocale}
                                availableLocales={languageConfig.availableLocales}
                                changeLanguage={languageConfig.changeLanguage}
                                getLanguageLabel={languageConfig.getLanguageLabel}
                            />
                        </div>

                        <nav className="space-y-2">
                            {navigationItems.map((item) => (
                                <Button
                                    key={item.key}
                                    variant="ghost"
                                    className="w-full justify-start text-left"
                                    asChild
                                >
                                    <a href={item.href} onClick={handleMenuItemClick}>
                                        {item.label}
                                    </a>
                                </Button>
                            ))}
                        </nav>

                        <div className="border-t pt-4 space-y-2">
                            <Button variant="outline" className="w-full justify-start" asChild>
                                <a href={`tel:${contactInfo.phone}`}>
                                    <Phone className="h-4 w-4 mr-2"/>
                                    {contactInfo.phone}
                                </a>
                            </Button>

                            <Button className="w-full justify-start" asChild>
                                <a href={contactInfo.whatsapp}>
                                    <MessageCircle className="h-4 w-4 mr-2"/>
                                    WhatsApp
                                </a>
                            </Button>
                        </div>
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    );
}
