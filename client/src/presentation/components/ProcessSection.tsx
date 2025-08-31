import {Calendar, LandPlot, MessageSquare} from "lucide-react";

import useTranslation from "@/hooks/useTranslation.ts";

import {HOW_IT_WORKS_SECTION_KEYS} from "@/shared/messages/messages.ts";

export default function ProcessSection() {
    const {t} = useTranslation();

    const steps = [
        {
            title: t(HOW_IT_WORKS_SECTION_KEYS.contactUsTitle),
            description: t(HOW_IT_WORKS_SECTION_KEYS.contactUsDescription),
            icon: MessageSquare
        },
        {
            title: t(HOW_IT_WORKS_SECTION_KEYS.confirmDetailsTitle),
            description: t(HOW_IT_WORKS_SECTION_KEYS.confirmDetailsDescription),
            icon: Calendar
        },
        {
            title: t(HOW_IT_WORKS_SECTION_KEYS.movingDayTitle),
            description: t(HOW_IT_WORKS_SECTION_KEYS.movingDayDescription),
            icon: LandPlot
        }
    ];

    return (
        <section id="process" className="section-padding bg-blue-50">
            <div className="container-custom">
                <div className="text-center max-w-2xl mx-auto mb-8 md:mb-12">
                    <h2 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4">
                        {t(HOW_IT_WORKS_SECTION_KEYS.sectionTitle)}
                    </h2>
                    <p className="text-sm md:text-base text-gray-700 px-4 md:px-0">
                        {t(HOW_IT_WORKS_SECTION_KEYS.sectionDescription)}
                    </p>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                    {steps.map((step, index) => (
                        <div key={index} className="relative">
                            <div
                                className="bg-white rounded-lg shadow-md p-6 md:p-8 text-center h-full flex flex-col items-center">
                                <div
                                    className="bg-primary/10 p-4 rounded-full inline-flex items-center justify-center mb-4">
                                    <step.icon className="text-primary" size={28}/>
                                </div>

                                <span
                                    className="bg-primary text-white text-lg font-bold w-9 h-9 rounded-full flex items-center justify-center mb-3">
                                    {index + 1}
                                </span>

                                <h3 className="text-lg md:text-xl font-semibold mb-2">
                                    {step.title}
                                </h3>
                                <p className="text-sm md:text-base text-gray-700">
                                    {step.description}
                                </p>
                            </div>

                            {/* Connector line - visible only on desktop */}
                            {index < steps.length - 1 && (
                                <div
                                    className="hidden md:block absolute top-1/2 right-0 w-full h-0.5 bg-gray-200 -z-10 transform translate-x-1/2">
                                    <div
                                        className="absolute right-0 top-1/2 w-3 h-3 bg-primary transform rotate-45 translate-x-1/2 -translate-y-1/2"></div>
                                </div>
                            )}

                            {/* Mobile connector - arrow down between steps */}
                            {index < steps.length - 1 && (
                                <div className="md:hidden flex justify-center my-2">
                                    <div className="w-0.5 h-6 bg-primary relative">
                                        <div
                                            className="absolute bottom-0 left-1/2 w-3 h-3 bg-primary transform rotate-45 -translate-x-1/2 translate-y-1/2"></div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}