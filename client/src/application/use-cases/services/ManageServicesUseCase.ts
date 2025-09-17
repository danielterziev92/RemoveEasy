import {Services} from "@/domain/aggregates";
import type {IServicesServiceErrorMessages} from "@/application/types";
import type {IServicesRepository} from "@/domain/repositories";
import type {IServicesApiClient} from "@/domain/services";
import type {IconValidator} from "@/domain/validators";

import {ServicesApiResponseDto} from "@/application/dto";

import type {ITranslationService} from "@/shared/localization/types";

export class ManageServicesUseCase {
    private readonly repository: IServicesRepository;
    private readonly apiClient: IServicesApiClient;
    private readonly errorMessages: IServicesServiceErrorMessages;
    private readonly translationService: ITranslationService;
    private readonly iconValidator: IconValidator;

    constructor(
        repository: IServicesRepository,
        apiClient: IServicesApiClient,
        errorMessages: IServicesServiceErrorMessages,
        translationService: ITranslationService,
        iconValidator: IconValidator,
    ) {
        this.repository = repository;
        this.apiClient = apiClient;
        this.errorMessages = errorMessages;
        this.translationService = translationService;
        this.iconValidator = iconValidator;
    }

    async getServices(): Promise<Services> {
        return await this.fetchAndStoreServices();
    }

    getCachedServices(): Services | null {
        return this.repository.getServices();
    }

    clearServices(): void {
        this.repository.clearServices();
    }

    private async fetchAndStoreServices(): Promise<Services> {
        const apiResponse = await this.apiClient.fetchServices();

        const services = ServicesApiResponseDto.toDomainAggregate(
            apiResponse,
            this.errorMessages,
            this.translationService,
            this.iconValidator,
        );

        this.repository.saveServices(services);
        return services;
    }
}