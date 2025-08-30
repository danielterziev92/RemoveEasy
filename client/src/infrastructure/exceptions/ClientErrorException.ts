import {ApiException} from "./ApiException.ts";

export class ClientErrorException extends ApiException {
    public static readonly DEFAULT_MESSAGE: string = "Client error occurred";

    constructor(statusCode: number, response: Response) {
        super(`${ClientErrorException.DEFAULT_MESSAGE} (${statusCode})`, statusCode, response);
        this.name = 'ClientErrorException';
    }
}