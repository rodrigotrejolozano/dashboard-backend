export interface MetaPagination {
    totalItems: number;
    totalPages: number;
    currentPage: number;
    nextPage?: number;
    prevPage?: number;
}

export class PaginationResponse<T> {
    success: boolean;
    message: string;
    code: number;
    data: T[];
    meta: MetaPagination;

    constructor(data: T[], totalItems: number, page: number, limit = 5, message = 'Operación exitosa', code = 200) {
        this.success = true;
        this.message = message;
        this.code = code;
        this.data = data;

        const totalPages = Math.ceil(totalItems / limit);
        const nextPage = page < totalPages ? page + 1 : undefined;
        const prevPage = page > 1 ? page - 1 : undefined;

        this.meta = {
            totalItems,
            totalPages,
            currentPage: page,
            nextPage,
            prevPage,
        };
    }
}
