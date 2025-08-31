import {CheckCircle, Phone, Truck} from "lucide-react";

import {HERO_SECTION_KEYS} from "@/application/messages/messages";
import {Button} from "@/components/ui/button.tsx";
import {Card, CardContent} from "@/components/ui/card.tsx";

import useTranslation from "@/hooks/useTranslation.ts";

interface Feature {
    icon: typeof CheckCircle;
    text: string;
    ariaLabel: string;
}

export default function HeroSection() {
    const {t} = useTranslation();

    const features: Feature[] = [
        {
            icon: CheckCircle,
            text: t(HERO_SECTION_KEYS.ukWideService),
            ariaLabel: "UK-wide service coverage"
        },
        {
            icon: CheckCircle,
            text: t(HERO_SECTION_KEYS.yearsExperience),
            ariaLabel: "Years of experience"
        },
        {
            icon: CheckCircle,
            text: t(HERO_SECTION_KEYS.bulgarianEnglishSpeaking),
            ariaLabel: "Multilingual support"
        },
        {
            icon: Truck,
            text: t(HERO_SECTION_KEYS.serviceOnChosenDay),
            ariaLabel: "Flexible scheduling"
        }
    ];

    const handleScrollToServices = () => {
        const servicesSection = document.getElementById('services');
        if (servicesSection) {
            servicesSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    };

    return (
        <section
            className="pt-28 pb-14 md:pt-32 md:pb-20 bg-gradient-to-br from-blue-50 to-white relative overflow-hidden"
            aria-label="Hero section"
        >
            {/* Background Decorative Elements */}
            <div
                className="absolute inset-0 pointer-events-none"
                aria-hidden="true"
            >
                <div
                    className="absolute top-1/2 left-0 w-40 h-40 md:w-64 md:h-64 bg-blue-100 rounded-full blur-3xl opacity-30 -translate-y-1/2"/>
                <div
                    className="absolute top-1/3 right-0 w-48 h-48 md:w-80 md:h-80 bg-blue-100 rounded-full blur-3xl opacity-30"/>
            </div>

            <div className="container-custom relative z-10">
                <div className="max-w-3xl mx-auto text-center">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 text-gray-900">
                        Re Move Easy
                        <span className="block text-xl md:text-2xl mt-2 md:mt-3 text-primary font-medium">
                            {t(HERO_SECTION_KEYS.safeReliableRelocationServices)}
                        </span>
                    </h1>

                    <p className="text-base md:text-lg text-gray-700 mb-6 md:mb-8 px-4 md:px-0">
                        {t(HERO_SECTION_KEYS.affordableReliableTransport)}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8 md:mb-12 px-4 md:px-0">
                        <Button
                            size="lg"
                            className="bg-primary hover:bg-primary/90 text-base md:text-lg py-5 md:py-6"
                            onClick={handleScrollToServices}
                            aria-label="Get a free quote for moving services"
                        >
                            {t(HERO_SECTION_KEYS.getFreeQuote)}
                        </Button>

                        <Button
                            variant="outline"
                            size="lg"
                            className="border-primary text-primary hover:bg-primary/5 text-base md:text-lg py-5 md:py-6"
                            asChild
                        >
                            <a
                                href="tel:07405211912"
                                className="flex items-center gap-1 text-sm hover:text-primary transition-colors"
                                aria-label="Call us now at 07405211912"
                            >
                                <Phone size={18} className="mr-2" aria-hidden="true"/>
                                {t(HERO_SECTION_KEYS.callUsNow)}
                            </a>
                        </Button>
                    </div>
                </div>

                {/* Features Section */}
                <Card className="bg-white/80 backdrop-blur-sm shadow-lg border-0 w-full">
                    <CardContent className="p-6 md:p-8">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {features.map((feature, index) => {
                                const Icon = feature.icon;
                                return (
                                    <div
                                        key={index}
                                        className="flex flex-col items-center text-center space-y-3 group hover:scale-105 transition-transform duration-200"
                                        role="listitem"
                                        aria-label={feature.ariaLabel}
                                    >
                                        <div
                                            className="p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors duration-200">
                                            <Icon
                                                size={20}
                                                className="text-primary"
                                                aria-hidden="true"
                                            />
                                        </div>
                                        <span
                                            className="text-sm md:text-base font-medium text-gray-700 leading-tight px-2">
                                                {feature.text}
                                            </span>
                                    </div>
                                );
                            })}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </section>
    )
        ;
}