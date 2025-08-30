import {NavigationItem} from "@/domain/entities";
import type {NavigationType} from "@/domain/types/NavigationType.ts";

export class NavigationService {
    private readonly navigationItems: NavigationItem[] = [
        new NavigationItem("#about", "header.navigation.about", "about"),
        new NavigationItem("#services", "header.navigation.services", "services"),
        new NavigationItem("#process", "header.navigation.howItWorks", "process"),
        new NavigationItem("#testimonials", "header.navigation.testimonials", "testimonials"),
        new NavigationItem("#contact", "header.navigation.contact", "contact"),
    ];

    getNavigationItems(t: (key: string) => string): NavigationType[] {
        return this.navigationItems.map(item => ({
            href: item.href,
            label: item.getLabel(t),
            key: item.key
        }));
    }
}
