import { ApiResponseInfer } from "../@types";

class ApiResponse implements ApiResponseInfer {
    statusCode: number;
    payload: Object;
    message: string;
    success: boolean;

    constructor(statusCode: number, payload: Object, message = "Success") {
        this.statusCode = statusCode;
        this.payload = payload;
        this.message = message;
        this.success = statusCode < 400;
    }
}

export { ApiResponse };
