import type {Store} from "@reduxjs/toolkit";

import type {IServicesApiClient} from "@/domain/services";
import type {IconValidator} from "@/domain/validators";

import {ManageServicesUseCase} from "@/application/use-cases/services";
import type {IServicesServiceErrorMessages} from "@/application/types";

import {RTKServicesRepository} from "@/infrastructure/repositories";

import type {ITranslationService} from "../localization/types";

export class ServicesContainer {
    private readonly _repository: RTKServicesRepository;
    private readonly _manageServicesUseCase: ManageServicesUseCase;

    constructor(
        store: Store,
        apiClient: IServicesApiClient,
        errorMessages: IServicesServiceErrorMessages,
        translationService: ITranslationService,
        iconValidator: IconValidator,
    ) {
        this._repository = new RTKServicesRepository(store);

        this._manageServicesUseCase = new ManageServicesUseCase(
            this._repository,
            apiClient,
            errorMessages,
            translationService,
            iconValidator,
        );
    }

    get manageServicesUseCase(): ManageServicesUseCase {
        return this._manageServicesUseCase;
    }

    get repository(): RTKServicesRepository {
        return this._repository;
    }
}