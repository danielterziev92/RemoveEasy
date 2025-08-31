import {CheckCircle, Clock, MapPin, MessageCircle, ShieldCheck, Users} from "lucide-react";

import useTranslation from "@/hooks/useTranslation.ts";

import {WHY_CHOOSE_US_SECTION_KEYS} from "@/shared/messages/messages.ts";

export default function WhyChooseUsSection() {
    const {t} = useTranslation();

    const features = [
        {
            title: t(WHY_CHOOSE_US_SECTION_KEYS.fastResponseTitle),
            description: t(WHY_CHOOSE_US_SECTION_KEYS.fastResponseDescription),
            icon: Clock
        },
        {
            title: t(WHY_CHOOSE_US_SECTION_KEYS.affordablePricingTitle),
            description: t(WHY_CHOOSE_US_SECTION_KEYS.affordablePricingDescription),
            icon: CheckCircle
        },
        {
            title: t(WHY_CHOOSE_US_SECTION_KEYS.ukWideCoverageTitle),
            description: t(WHY_CHOOSE_US_SECTION_KEYS.ukWideCoverageDescription),
            icon: MapPin
        },
        {
            title: t(WHY_CHOOSE_US_SECTION_KEYS.bilingualStaffTitle),
            description: t(WHY_CHOOSE_US_SECTION_KEYS.bilingualStaffDescription),
            icon: MessageCircle
        },
        {
            title: t(WHY_CHOOSE_US_SECTION_KEYS.safeHandlingTitle),
            description: t(WHY_CHOOSE_US_SECTION_KEYS.safeHandlingDescription),
            icon: ShieldCheck
        },
        {
            title: t(WHY_CHOOSE_US_SECTION_KEYS.experiencedTeamTitle),
            description: t(WHY_CHOOSE_US_SECTION_KEYS.experiencedTeamDescription),
            icon: Users
        }
    ];


    return (
        <section className="section-padding bg-white">
            <div className="container-custom">
                <div className="text-center max-w-2xl mx-auto mb-8 md:mb-12">
                    <h2 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4">
                        {t(WHY_CHOOSE_US_SECTION_KEYS.sectionTitle)}
                    </h2>
                    <p className="text-sm md:text-base text-gray-700 px-4 md:px-0">
                        {t(WHY_CHOOSE_US_SECTION_KEYS.sectionDescription)}
                    </p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((feature, index) => (
                        <div key={index} className="flex items-start gap-3 md:gap-4">
                            <div className="bg-primary/10 p-2.5 md:p-3 rounded-full flex-shrink-0">
                                <feature.icon className="text-primary" size={20}/>
                            </div>
                            <div>
                                <h3 className="text-base md:text-lg font-semibold mb-1">
                                    {feature.title}
                                </h3>
                                <p className="text-sm md:text-base text-gray-700">
                                    {feature.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}