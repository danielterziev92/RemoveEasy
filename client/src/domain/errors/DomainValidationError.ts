export class DomainValidationError extends Error {
    public readonly code: string;

    constructor(code: string, message?: string) {
        super(message || code);
        this.code = code;
        this.name = 'DomainValidationError';
    }
}