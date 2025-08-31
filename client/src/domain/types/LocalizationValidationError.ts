import {DomainError} from "@/domain/types/DomainError.ts";

export class LocalizationValidationError extends DomainError {
    constructor(message: string) {
        super(message, "LOCALIZATION_VALIDATION_ERROR");
    }
}