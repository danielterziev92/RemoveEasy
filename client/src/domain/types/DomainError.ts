export abstract class DomainError extends Error {
    public readonly code: string;
    public readonly timestamp: Date;

    protected constructor(message: string, code: string) {
        super(message);
        this.code = code;
        this.timestamp = new Date();
        this.name = this.constructor.name;
    }
}