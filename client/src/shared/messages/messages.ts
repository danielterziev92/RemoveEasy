import {createTranslationKeysAdapter} from "@/shared/localization/createTranslationKeysAdapter.ts";

import type {
    IAboutSectionMessages,
    IHeroSectionMessages,
    IHowItWorksSectionMessages,
    IReviewSectionMessages,
    IServicesSectionMessages,
    IWhyChooseUsSectionMessages
} from "@/presentation/types/messages";

export const HERO_SECTION_KEYS: IHeroSectionMessages = createTranslationKeysAdapter<IHeroSectionMessages>('heroSection');
export const ABOUT_SECTION_KEYS: IAboutSectionMessages = createTranslationKeysAdapter<IAboutSectionMessages>('aboutSection');
export const SERVICES_SECTION_KEYS: IServicesSectionMessages = createTranslationKeysAdapter<IServicesSectionMessages>('servicesSection');
export const WHY_CHOOSE_US_SECTION_KEYS: IWhyChooseUsSectionMessages = createTranslationKeysAdapter<IWhyChooseUsSectionMessages>('whyChooseUsSection');
export const HOW_IT_WORKS_SECTION_KEYS: IHowItWorksSectionMessages = createTranslationKeysAdapter<IHowItWorksSectionMessages>('howItWorksSection');
export const REVIEW_SECTION_KEYS: IReviewSectionMessages = createTranslationKeysAdapter<IReviewSectionMessages>('reviewSection');