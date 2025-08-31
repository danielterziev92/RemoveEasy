import {createTranslationKeysAdapter} from "@/shared/localization/createTranslationKeysAdapter.ts";

import type {
    IAboutSectionMessages,
    IHeroSectionMessages,
    IServicesSectionMessages
} from "@/presentation/types/messages";

export const HERO_SECTION_KEYS: IHeroSectionMessages = createTranslationKeysAdapter<IHeroSectionMessages>('heroSection');
export const ABOUT_SECTION_KEYS: IAboutSectionMessages = createTranslationKeysAdapter<IAboutSectionMessages>('aboutSection');
export const SERVICES_SECTION_KEYS: IServicesSectionMessages = createTranslationKeysAdapter<IServicesSectionMessages>('servicesSection');