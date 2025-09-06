import type {Store} from "@reduxjs/toolkit";

import type {IInventoryApiClient} from "@/domain/services";
import type {IconValidator} from "@/domain/validators";

import type {IInventoryServiceErrorMessages} from "@/application/types";
import {ManageInventoryUseCase} from "@/application/use-cases/inventory";

import {RTKInventoryRepository} from "@/infrastructure/repositories";

import type {ITranslationService} from "@/shared/localization/types";

export class InventoryContainer {
    private readonly _repository: RTKInventoryRepository;
    private readonly _manageInventoryUseCase: ManageInventoryUseCase;

    constructor(
        store: Store,
        apiClient: IInventoryApiClient,
        errorMessages: IInventoryServiceErrorMessages,
        translationService: ITranslationService,
        validator: IconValidator,
    ) {
        this._repository = new RTKInventoryRepository(store);

        this._manageInventoryUseCase = new ManageInventoryUseCase(
            this._repository,
            apiClient,
            errorMessages,
            translationService,
            validator,
        );
    }

    get manageInventoryUseCase(): ManageInventoryUseCase {
        return this._manageInventoryUseCase;
    }

    get repository(): RTKInventoryRepository {
        return this._repository;
    }
}