import type {NavigationItemDto} from "@/application/dto";
import {NavigationItem} from "@/application/navigation";

export class NavigationService {
    private readonly navigationItems: NavigationItem[] = [
        new NavigationItem("#about", "header.navigation.about", "about"),
        new NavigationItem("#services", "header.navigation.services", "services"),
        new NavigationItem("#process", "header.navigation.howItWorks", "process"),
        new NavigationItem("#reviews", "header.navigation.reviews", "reviews"),
        new NavigationItem("#contact", "header.navigation.contact", "contact"),
    ];

    getNavigationItems(t: (key: string) => string): NavigationItemDto[] {
        return this.navigationItems.map(item => item.toDto(t));
    }
}
