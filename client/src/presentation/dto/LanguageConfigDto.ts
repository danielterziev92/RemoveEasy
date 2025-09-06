import type {LocaleDisplayDto} from "@/presentation/dto/LocaleDisplayDto.ts";

export interface LanguageConfigDto {
    currentLocale: LocaleDisplayDto;
    availableLocales: LocaleDisplayDto[];
    changeLanguage: (localeCode: string) => Promise<{ success: boolean; message?: string }>;
}