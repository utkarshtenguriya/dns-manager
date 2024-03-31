"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiResponse = void 0;
class ApiResponse {
    constructor(statusCode, payload, message = "Success") {
        this.statusCode = statusCode;
        this.payload = payload;
        this.message = message;
        this.success = statusCode < 400;
    }
}
exports.ApiResponse = ApiResponse;
//# sourceMappingURL=ApiResponse.js.map