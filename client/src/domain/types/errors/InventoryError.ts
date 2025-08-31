import {DomainError} from "./DomainError";

export class InventoryError extends DomainError {
    constructor(message: string, code: string) {
        super(message, code);
    }

    static invalidSection(title: string): InventoryError {
        return new InventoryError(`Invalid section: ${title}`, 'INVALID_SECTION');
    }

    static invalidData(): InventoryError {
        return new InventoryError('Invalid inventory data', 'INVALID_DATA');
    }

    static storeUnavailable(): InventoryError {
        return new InventoryError('Store not available', 'STORE_UNAVAILABLE');
    }

    static fetchFailed(reason?: string): InventoryError {
        return new InventoryError(
            `Data fetch failed${reason ? `: ${reason}` : ''}`,
            'FETCH_FAILED'
        );
    }
}