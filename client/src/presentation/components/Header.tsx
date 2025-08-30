import {useEffect, useState} from "react";
import {Menu, MessageCircle, Phone} from "lucide-react";

import {cn} from "@/lib/utils";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList
} from "@/components/ui/navigation-menu";
import {Button} from "@/components/ui/button";
import {Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger} from "@/components/ui/sheet.tsx";
import useTranslation from "@/hooks/useTranslation";
import LanguageSelector from "@/components/LanguageSelector.tsx";

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const {t, currentLocale, availableLocales, changeLanguage} = useTranslation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const getLanguageLabel = (locale: string) => {
        const labels = {
            'bg': 'БГ',
            'en': 'EN'
        };
        return labels[locale as keyof typeof labels] || locale;
    };

    const navigationItems = [
        {href: "#about", label: t("header.navigation.about")},
        {href: "#services", label: t("header.navigation.services")},
        {href: "#process", label: t("header.navigation.howItWorks")},
        {href: "#testimonials", label: t("header.navigation.testimonials")},
        {href: "#contact", label: t("header.navigation.contact")},
    ];

    return (
        <header
            className={cn(
                "fixed w-full top-0 z-40 transition-all duration-300",
                isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-3'
            )}
        >
            <div className="container-custom flex items-center justify-between">
                {/* Logo */}
                <a href="/" className="flex items-center gap-2 z-20">
                    <img
                        src="/images/0874879a-fa04-420c-bb0d-e3058295bc79.png"
                        alt="Re Move Easy Logo"
                        className="h-10 md:h-12"
                    />
                    <div className="flex flex-col">
            <span className="text-xl md:text-2xl font-bold text-primary">
              {t("Re Move Easy")}
            </span>
                        <span
                            className="text-sm md:text-base font-medium"
                            style={{fontFamily: 'cursive', color: '#4169E1'}}
                        >
              {t("MEN & VAN SERVICES")}
            </span>
                    </div>
                </a>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-8">
                    <NavigationMenu>
                        <NavigationMenuList>
                            {navigationItems.map((item) => (
                                <NavigationMenuItem key={item.href}>
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
                        {/* Language Dropdown */}
                        <LanguageSelector
                            currentLocale={currentLocale}
                            availableLocales={availableLocales}
                            changeLanguage={changeLanguage}
                            getLanguageLabel={getLanguageLabel}
                        />

                        {/* Phone Link */}
                        <Button variant="ghost" size="sm" asChild>
                            <a href="tel:07405211912" className="flex items-center gap-1">
                                <Phone className="h-4 w-4"/>
                                <span className="hidden lg:inline">07405211912</span>
                            </a>
                        </Button>

                        {/* WhatsApp Button */}
                        <Button size="sm" asChild>
                            <a href="https://wa.me/07405211912">
                                <MessageCircle className="h-4 w-4 mr-2"/>
                                WhatsApp
                            </a>
                        </Button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <div className="md:hidden flex items-center gap-3 z-20">
                    {/* Mobile Language Dropdown */}
                    <LanguageSelector
                        currentLocale={currentLocale}
                        availableLocales={availableLocales}
                        changeLanguage={changeLanguage}
                        getLanguageLabel={getLanguageLabel}
                    />

                    {/* Mobile Menu Sheet */}
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="sm">
                                <Menu className="h-6 w-6"/>
                                <span className="sr-only">Отвори меню</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                            <SheetHeader>
                                <SheetTitle>Навигация</SheetTitle>
                            </SheetHeader>
                            <div className="grid gap-4 py-4">
                                <nav className="grid gap-2">
                                    {navigationItems.map((item) => (
                                        <Button
                                            key={item.href}
                                            variant="ghost"
                                            className="justify-start"
                                            asChild
                                        >
                                            <a href={item.href}>{item.label}</a>
                                        </Button>
                                    ))}
                                </nav>

                                <div className="border-t pt-4 space-y-2">
                                    <Button variant="outline" className="w-full justify-start" asChild>
                                        <a href="tel:07405211912">
                                            <Phone className="h-4 w-4 mr-2"/>
                                            07405211912
                                        </a>
                                    </Button>

                                    <Button className="w-full justify-start" asChild>
                                        <a href="https://wa.me/07405211912">
                                            <MessageCircle className="h-4 w-4 mr-2"/>
                                            WhatsApp
                                        </a>
                                    </Button>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
}