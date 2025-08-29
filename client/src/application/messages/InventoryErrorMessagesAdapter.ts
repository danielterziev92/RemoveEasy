import type {IInventoryErrorMessages} from "../../domain/types/IInventoryErrorMessages.ts";
import type {ITranslationService} from "../../shared/localization/types/ITranslationService.ts";

export class InventoryErrorMessagesAdapter implements IInventoryErrorMessages {
    private translationService: ITranslationService;

    constructor(translationService: ITranslationService) {
        this.translationService = translationService;
    }

    get invalidSectionTitle(): string {
        return this.translationService.t('inventory.errors.invalidSectionTitle');
    }

    get storeNotAvailable(): string {
        return this.translationService.t('inventory.errors.storeNotAvailable');
    }

    get invalidInventoryData(): string {
        return this.translationService.t('inventory.errors.invalidInventoryData');
    }

    get dataFetchFailed(): string {
        return this.translationService.t('inventory.errors.dataFetchFailed');
    }
}