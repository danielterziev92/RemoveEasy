import {createTranslationKeysAdapter} from "@/shared/localization/createTranslationKeysAdapter.ts";

import type {IHeroSectionMessages} from "@/domain/types";

export const HERO_SECTION_KEYS: IHeroSectionMessages = createTranslationKeysAdapter<IHeroSectionMessages>('heroSection');
