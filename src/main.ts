import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ErrorHandlerMiddleware } from './common/middlewares/error-handler.middleware';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('API de Productos')
    .setDescription('Documentación de la API de productos y métricas')
    .setVersion('1.0')
    .build();
    app.use(ErrorHandlerMiddleware);
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);
  app.enableCors({
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  await app.listen(process.env.PORT ?? 3000);
  console.log(`Server running on http://localhost:3000`);
  console.log(`API documentation running on http://localhost:3000/api/docs`);
}
bootstrap();
