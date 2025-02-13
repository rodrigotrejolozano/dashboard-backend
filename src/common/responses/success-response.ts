export class SuccessResponse<T> {
    success: boolean;
    message?: string;
    code: number;
    data: T;
    meta?: Record<string, unknown>;

    constructor(data: T, message = 'Operación exitosa', code = 200, meta?: Record<string, unknown>) {
        this.success = true;
        this.message = message;
        this.code = code;
        this.data = data;
        this.meta = meta;
    }
}
