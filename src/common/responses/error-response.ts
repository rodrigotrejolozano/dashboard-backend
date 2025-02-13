export class ErrorResponse {
    success: boolean;
    message: string;
    code: number;
    errors?: Record<string, string[]>;

    constructor(message: string, code: number, errors?: Record<string, string[]>) {
        this.success = false;
        this.message = message;
        this.code = code;
        this.errors = errors;
    }
}
