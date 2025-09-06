import {Clock, Mail, MapPin, MessageCircle, Phone} from "lucide-react";

import useTranslation from "@/hooks/useTranslation.ts";

import {headerContainer} from "@/shared/di/HeaderContainer.ts";
import {CONTACT_SECTION_KEYS} from "@/shared/messages/messages.ts";

export default function ContactSection() {
    const {t} = useTranslation();

    const contactInfo = headerContainer.headerViewService.getContactInfo();

    const contactItems = [
        {
            icon: Phone,
            title: CONTACT_SECTION_KEYS.phoneNumber,
            content: (
                <a href={`tel:${contactInfo.phone}`} className="text-primary hover:underline text-sm md:text-base">
                    {contactInfo.phone}
                </a>
            )
        },
        {
            icon: MessageCircle,
            title: "WhatsApp",
            content: (
                <a href={`https://wa.me/${contactInfo.whatsapp}`}
                   className="text-primary hover:underline text-sm md:text-base">
                    {contactInfo.whatsapp}
                </a>
            )
        },
        {
            icon: Mail,
            title: CONTACT_SECTION_KEYS.emailAddress,
            content: (
                <a href="mailto:info@removeeasy.co.uk"
                   className="text-primary hover:underline text-sm md:text-base break-words">
                    info@removeeasy.co.uk
                </a>
            )
        },
        {
            icon: Clock,
            title: CONTACT_SECTION_KEYS.workingHours,
            content: (
                <div>
                    <p className="text-sm md:text-base">{t(CONTACT_SECTION_KEYS.mondayToSaturday)}</p>
                    <p className="text-sm md:text-base">{t(CONTACT_SECTION_KEYS.sunday)}</p>
                </div>
            )
        },
        {
            icon: MapPin,
            title: CONTACT_SECTION_KEYS.serviceArea,
            content: (
                <div>
                    <p className="text-sm md:text-base">{t(CONTACT_SECTION_KEYS.ukWideCoverage)}</p>
                    <p className="text-sm md:text-base">{t(CONTACT_SECTION_KEYS.basedInLondon)}</p>
                </div>
            )
        }
    ];

    return (
        <section id="contact" className="section-padding bg-blue-50">
            <div className="container-custom">
                <div className="text-center max-w-2xl mx-auto mb-8 md:mb-12">
                    <h2 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4">
                        {t(CONTACT_SECTION_KEYS.sectionTitle)}
                    </h2>
                    <p className="text-sm md:text-base text-gray-700 px-4 md:px-0 mb-2">
                        {t(CONTACT_SECTION_KEYS.sectionDescription)}
                    </p>
                </div>

                <div className="max-w-md md:max-w-xl lg:max-w-2xl mx-auto px-4 md:px-0">
                    <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
                        <h3 className="text-lg md:text-xl font-semibold mb-5 md:mb-6">
                            {t(CONTACT_SECTION_KEYS.contactInformation)}
                        </h3>

                        <div className="space-y-5 md:space-y-6">
                            {contactItems.map((item, index) => {
                                const IconComponent = item.icon;
                                return (
                                    <div key={index} className="flex items-start gap-3 md:gap-4">
                                        <div className="bg-primary/10 p-2.5 md:p-3 rounded-full flex-shrink-0">
                                            <IconComponent className="text-primary" size={18}/>
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-sm md:text-base">
                                                {t(item.title)}
                                            </h4>
                                            {item.content}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}