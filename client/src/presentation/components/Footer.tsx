import useTranslation from "@/hooks/useTranslation.ts";

import {headerContainer} from "@/shared/di/HeaderContainer.ts";
import {FOOTER_KEYS, SERVICES_SECTION_KEYS} from "@/shared/messages/messages";

export default function Footer() {
    const {t} = useTranslation();

    const navigationItems = headerContainer.headerViewService.getNavigationItems(t);

    const services = [
        {
            title: t(SERVICES_SECTION_KEYS.transportOnlyTitle),
            price: t(SERVICES_SECTION_KEYS.transportOnlyPrice),
        },
        {
            title: t(SERVICES_SECTION_KEYS.transportWithHelpersTitle),
            price: t(SERVICES_SECTION_KEYS.transportWithHelpersPrice),
        },
        {
            title: t(SERVICES_SECTION_KEYS.fullServiceTitle),
            price: t(SERVICES_SECTION_KEYS.fullServicePrice),
        },
    ];

    return (
        <footer className="bg-gray-900 text-white pt-12 pb-6 md:pt-16 md:pb-8">
            <div className="container-custom">
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 mb-10 md:mb-12">
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <span className="text-2xl md:text-3xl">
                                <img src={"favicon.svg"} alt="Re Move Easy Logo" className="w-12 h-12"/>
                            </span>
                            <span className="text-xl md:text-2xl font-bold">Re Move Easy</span>
                        </div>

                        <p className="text-gray-400 mb-5 text-sm md:text-base">
                            {t(FOOTER_KEYS.companyDescription)}
                        </p>
                    </div>

                    <div>
                        <h3 className="text-base md:text-lg font-semibold mb-4">{t(FOOTER_KEYS.quickLinks)}</h3>
                        <ul className="space-y-2 text-sm md:text-base">

                            {navigationItems.map((item) => (
                                <li>
                                    <a href={item.href} className="text-gray-400 hover:text-primary transition-colors">
                                        {item.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="sm:col-span-2 lg:col-span-1">
                        <h3 className="text-base md:text-lg font-semibold mb-4">{t(SERVICES_SECTION_KEYS.sectionTitle)}</h3>
                        <ul className="space-y-2 text-sm md:text-base">
                            {services.map((service, index) => (
                                <li className="text-gray-400" key={index}>{service.title} - {service.price}</li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 pt-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-gray-400 text-xs md:text-sm text-center md:text-left">
                            © {new Date().getFullYear()} Re Move Easy. {t(FOOTER_KEYS.allRightsReserved)}
                        </p>

                        <div className="text-gray-400 text-xs md:text-sm flex flex-wrap gap-3 md:gap-4 justify-center">
                            <a href="#"
                               className="hover:text-primary transition-colors">{t(FOOTER_KEYS.privacyPolicy)}</a>
                            <a href="#"
                               className="hover:text-primary transition-colors">{t(FOOTER_KEYS.termsOfService)}</a>
                            <span>{t(FOOTER_KEYS.registeredInEnglandWales)}</span>
                        </div>
                    </div>
                    <div className="mt-4 text-center text-xs text-gray-600">
                        <p>{t(FOOTER_KEYS.cookiesNotice)}</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}