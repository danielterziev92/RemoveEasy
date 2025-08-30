export class ApiException extends Error {
    readonly statusCode?: number;
    readonly response?: Response;

    constructor(message: string, statusCode?: number, response?: Response) {
        super(message);

        this.name = 'ApiException';
        this.statusCode = statusCode;
        this.response = response;
    }
}