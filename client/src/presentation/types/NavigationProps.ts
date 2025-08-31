import type {NavigationItemDto} from "@/application/dto";

import {ContactInfo, LanguageConfig} from "@/domain/value-objects";

export interface NavigationProps {
    navigationItems: NavigationItemDto[];
    languageConfig: LanguageConfig;
    contactInfo: ContactInfo;
}
