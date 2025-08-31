import type {ILocalizationRepository} from "@/domain/repositories";
import {LocalizationDomainService} from "@/domain/services";

export class SetLocaleUseCase {
    private localizationRepository: ILocalizationRepository;
    private localizationDomainService: LocalizationDomainService;

    constructor(
        localizationRepository: ILocalizationRepository,
        localizationDomainService: LocalizationDomainService
    ) {
        this.localizationRepository = localizationRepository;
        this.localizationDomainService = localizationDomainService;
    }

    execute(locale: string): { success: boolean; message?: string } {
        if (!this.localizationDomainService.isLocaleSupported(locale)) {
            return {
                success: false,
                message: `Locale '${locale}' is not supported`
            };
        }

        this.localizationRepository.setCurrentLocale(locale);
        this.localizationRepository.saveLocale(locale);

        return {success: true};
    }
}
