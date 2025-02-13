import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { SuccessResponse } from '../responses/success-response';
import { PaginationResponse } from '../responses/pagination-response';

@Injectable()
export class FormatResponseInterceptor<T> implements NestInterceptor<T, SuccessResponse<T> | PaginationResponse<T>> {
    intercept(context: ExecutionContext, next: CallHandler<T>): Observable<SuccessResponse<T> | PaginationResponse<T>> {
        return next.handle().pipe(
            map((data) => {
                if (data instanceof SuccessResponse || data instanceof PaginationResponse) {
                    return data;
                }
                return new SuccessResponse(data);
            }),
        );
    }
}
