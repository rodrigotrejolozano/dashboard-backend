import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { FormatResponseInterceptor } from './common/interceptors/format-response.interceptor';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { LoggerMiddleware } from './common/middlewares/logger.middlewares';

@Module({
  imports: [ProductsModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: FormatResponseInterceptor
    },
    {
      provide:APP_FILTER,
      useClass: HttpExceptionFilter
    }
  ],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
