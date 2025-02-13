import { Request, Response, NextFunction } from 'express';
import { ErrorResponse } from '../responses/error-response';
import { HttpException, HttpStatus } from '@nestjs/common';

export function ErrorHandlerMiddleware(
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) {
    const status = err instanceof HttpException ? err.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    const response = err.getResponse ? err.getResponse() : { message: err.message };

    console.error(`[ERROR] ${req.method} ${req.originalUrl} - ${response.message}`);

    res.status(status).json(
        new ErrorResponse(
            response.message || 'Ocurrió un error inesperado',
            status,
            response.errors || undefined
        )
    );
}
