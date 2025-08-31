import {createTranslationKeysAdapter} from "@/shared/localization/createTranslationKeysAdapter.ts";

import type {IAboutSectionMessages, IHeroSectionMessages} from "@/domain/types";

export const HERO_SECTION_KEYS: IHeroSectionMessages = createTranslationKeysAdapter<IHeroSectionMessages>('heroSection');
export const ABOUT_SECTION_KEYS: IAboutSectionMessages = createTranslationKeysAdapter<IAboutSectionMessages>('aboutSection');