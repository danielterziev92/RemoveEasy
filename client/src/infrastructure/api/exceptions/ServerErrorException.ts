import {ApiException} from "./ApiException.ts";

export class ServerErrorException extends ApiException {
    public static readonly DEFAULT_MESSAGE: string = "Server error occurred";

    constructor(statusCode: number, response: Response) {
        super(ServerErrorException.DEFAULT_MESSAGE, statusCode, response);
        this.name = 'ServerErrorException';
    }
}