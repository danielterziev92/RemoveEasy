import type {ILocalizationRepository} from "@/domain/repositories";
import type {ILocalizationDomainService} from "@/domain/services";

export class SetLocaleUseCase {
    private localizationRepository: ILocalizationRepository;
    private localizationDomainService: ILocalizationDomainService;

    constructor(
        localizationRepository: ILocalizationRepository,
        localizationDomainService: ILocalizationDomainService
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
