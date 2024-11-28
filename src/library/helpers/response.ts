import { Response } from "express";

interface ResponseBody {
    success: boolean;
    message: string;
    content: any;
}

export class BaseResponse {
    success: boolean;
    message: string;
    content: any;
    statusCode: number

    constructor(success: boolean, message: string, content: any) {
        this.success = success;
        this.message = message;
        this.content = content;
        this.statusCode = 0
    }

    send(res: Response, statusCode?: number ) {
        const responseBody: ResponseBody = {
            success: this.success,
            message: this.message,
            content: this.content,
        };
        res.status(statusCode || this.statusCode).send(responseBody);
    }
}

export class SuccessResponse extends BaseResponse {
    constructor(message: string, content: any) {
        super(true, message, content);

        this.statusCode = 200
    }
}

export class FailureResponse extends BaseResponse {
    constructor(message: string, content: any) {
        super(false, message, content);

        this.statusCode = 500
    }
}
