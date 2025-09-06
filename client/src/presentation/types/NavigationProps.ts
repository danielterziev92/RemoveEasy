import type {NavigationItemDto} from "@/application/dto";
import {ContactInfoDto, type LanguageConfigDto} from "@/presentation/dto";

export interface NavigationProps {
    navigationItems: NavigationItemDto[];
    languageConfig: LanguageConfigDto;
    contactInfo: ContactInfoDto;
}
