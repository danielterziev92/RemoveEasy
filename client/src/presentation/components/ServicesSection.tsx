import {Link} from "react-router-dom";

import {X} from "lucide-react";

import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Button} from "@/components/ui/button.tsx";

import useTranslation from "@/hooks/useTranslation.ts";

import {SERVICES_SECTION_KEYS} from "@/shared/messages/messages.ts";
import useServices from "@/hooks/useServices.ts";
import {IconService} from "@/infrastructure/services";
import {IconClass} from "@/domain/value-objects";
import applicationContainer from "@/shared/di/container.ts";

export default function ServicesSection() {
    const {t, currentLocale} = useTranslation();

    const {services, isLoading, error} = useServices();

    if (error) {
        return (
            <section id="services" className="section-padding bg-blue-50">
                <div className="container-custom">
                    <div className="text-center">
                        <p className="text-red-600">Error loading services: {error}</p>
                    </div>
                </div>
            </section>
        );
    }

    if (isLoading) {
        return (
            <section id="services" className="section-padding bg-blue-50">
                <div className="container-custom">
                    <div className="text-center">
                        <p>Loading services...</p>
                    </div>
                </div>
            </section>
        );
    }
    //
    // const services = [
    //     {
    //         title: t(SERVICES_SECTION_KEYS.transportOnlyTitle),
    //         subtitle: t(SERVICES_SECTION_KEYS.transportOnlySubtitle),
    //         description: t(SERVICES_SECTION_KEYS.transportOnlyDescription),
    //         icon: Truck,
    //         price: t(SERVICES_SECTION_KEYS.transportOnlyPrice),
    //         features: [
    //             t(SERVICES_SECTION_KEYS.transportOnlyEconomical),
    //             t(SERVICES_SECTION_KEYS.transportOnlyFlexible),
    //             t(SERVICES_SECTION_KEYS.transportOnlyCareful)
    //         ]
    //     },
    //     {
    //         title: t(SERVICES_SECTION_KEYS.transportWithHelpersTitle),
    //         subtitle: t(SERVICES_SECTION_KEYS.transportWithHelpersSubtitle),
    //         description: t(SERVICES_SECTION_KEYS.transportWithHelpersDescription),
    //         icon: Users,
    //         price: t(SERVICES_SECTION_KEYS.transportWithHelpersPrice),
    //         features: [
    //             t(SERVICES_SECTION_KEYS.transportWithHelpersExperience),
    //             t(SERVICES_SECTION_KEYS.transportWithHelpersEquipment),
    //             t(SERVICES_SECTION_KEYS.transportWithHelpersPrecision)
    //         ]
    //     },
    //     {
    //         title: t(SERVICES_SECTION_KEYS.fullServiceTitle),
    //         subtitle: t(SERVICES_SECTION_KEYS.fullServiceSubtitle),
    //         description: t(SERVICES_SECTION_KEYS.fullServiceDescription),
    //         icon: Building2,
    //         price: t(SERVICES_SECTION_KEYS.fullServicePrice),
    //         features: [
    //             t(SERVICES_SECTION_KEYS.fullServiceStressFree),
    //             t(SERVICES_SECTION_KEYS.fullServiceSuitable),
    //             t(SERVICES_SECTION_KEYS.fullServiceComplete)
    //         ]
    //     },
    // ];

    return (
        <section id="services" className="section-padding bg-blue-50">
            <div className="container-custom">
                <div className="text-center max-w-2xl mx-auto mb-8 md:mb-12">
                    <h2 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4">
                        {t(SERVICES_SECTION_KEYS.sectionTitle)}
                    </h2>
                    <p className="text-sm md:text-base text-gray-700 px-4 md:px-0">
                        {t(SERVICES_SECTION_KEYS.sectionDescription)}
                    </p>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {services.map((service) => {
                        const IconComponent = IconService.isValid(service.iconClass)
                            ? IconService.getComponent(IconClass.create(service.iconClass, applicationContainer.iconValidator))
                            : X;

                        const subtitle = service.getDisplaySubtitle(currentLocale);
                        const buttonText = service.getDisplayButtonText(currentLocale) || t(SERVICES_SECTION_KEYS.describeInventoryButton);

                        // Parse description to extract features (lines starting with -)
                        const description = service.getDisplayDescription(currentLocale);
                        const parts = description.split('\n\n');
                        const mainDescription = parts[0] || '';
                        const featuresText = parts[1] || '';
                        const features = featuresText
                            .split('\n')
                            .filter(line => line.trim().startsWith('-'))
                            .map(line => line.trim().substring(1).trim());

                        return (
                            <Card key={service.id}
                                  className="bg-white border-none shadow-md hover:shadow-lg transition-shadow h-full flex flex-col">
                                <CardHeader className="pb-2">
                                    <div
                                        className="bg-primary/10 p-3 w-14 h-14 rounded-md flex items-center justify-center mb-4">
                                        <IconComponent className="text-primary" size={28}/>
                                    </div>
                                    <div className="min-h-[60px] flex flex-col justify-center">
                                        <CardTitle className="text-lg md:text-xl">
                                            {service.getDisplayTitle(currentLocale)}
                                        </CardTitle>
                                        {subtitle && (
                                            <p className="text-sm text-primary italic mt-1">{subtitle}</p>
                                        )}
                                    </div>
                                    <CardDescription className="text-primary font-medium mt-2">
                                        {service.getDisplayPrice()}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="flex-grow flex flex-col">
                                    <p className="text-sm md:text-base text-gray-700 mb-4 whitespace-pre-line">
                                        {mainDescription}
                                    </p>

                                    {features.length > 0 && (
                                        <ul className="mt-4 space-y-3 text-sm md:text-base text-gray-700">
                                            {features.map((feature, i) => (
                                                <li key={i} className="flex items-center gap-2">
                                                    <span
                                                        className="min-w-3.5 w-3.5 h-3.5 bg-primary rounded-full flex-shrink-0"></span>
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>
                                    )}

                                    <div className="mt-auto pt-4 flex justify-center">
                                        <Button asChild>
                                            <Link to="/inventory">
                                                {buttonText}
                                            </Link>
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}