# 🛠️ Backend de Productos - NestJS

Este backend está desarrollado con **NestJS**, utilizando **Swagger** para la documentación de APIs y **Class Validator** para validaciones. Almacena los datos en memoria mediante un **arreglo estático**, sin conexión a base de datos.

---

## 🚀 Tecnologías utilizadas

- **NestJS** (Framework backend basado en Node.js)
- **Class Validator & Class Transformer** (Validaciones y transformación de DTOs)
- **Swagger** (Documentación de APIs)
- **Manejo de errores con Middlewares**

---

## 📂 Estructura del Proyecto

```plaintext
src/
│── common/               # Respuestas y middlewares
│── products/             # Módulo de productos
│   ├── dto/              # DTOs para validaciones
│   ├── products.service.ts # Lógica de negocio
│   ├── products.controller.ts # Endpoints del API
│── main.ts               # Punto de entrada del servidor
```

---

## 🛠️ Instalación y ejecución

### 1️⃣ Clonar el repositorio

```bash
git clone https://github.com/rodrigotrejolozano/dashboard-backend.git
cd tu-repo/backend
```

### 2️⃣ Instalar dependencias

```bash
npm install
```

### 3️⃣ Ejecutar en modo desarrollo

```bash
npm run start:dev
```

El backend estará disponible en `http://localhost:3000` 🚀

---

## 📌 Documentación con Swagger

Swagger está configurado en `main.ts` y accesible en:

📌 `http://localhost:3000/api`

Para generar la documentación se usa:

```ts
const config = new DocumentBuilder()
  .setTitle('API de Productos')
  .setDescription('Documentación de la API de productos y métricas')
  .setVersion('1.0')
  .build();
```

**Ejemplo de DTO con validaciones:**

```ts
import { IsString, IsNumber, Min, IsOptional } from 'class-validator';

export class ProductDto {
  @IsString()
  name: string;

  @IsNumber()
  @Min(0.01)
  price: number;

  @IsNumber()
  @Min(0)
  stock: number;
}
```

---

## 📊 APIs RESTful

| Método   | Endpoint        | Descripción                             |
| -------- | --------------- | --------------------------------------- |
| `GET`    | `/products`     | Obtener productos paginados y filtrados |
| `GET`    | `/products/:id` | Obtener un producto por ID              |
| `POST`   | `/products`     | Crear un nuevo producto                 |
| `PUT`    | `/products/:id` | Actualizar un producto                  |
| `DELETE` | `/products/:id` | Eliminar un producto                    |

📌 **Métricas y estadísticas:**

| Método | Endpoint                                   | Descripción               |
| ------ | ------------------------------------------ | ------------------------- |
| `GET`  | `/products/metrics/total-products`         | Total de productos        |
| `GET`  | `/products/metrics/total-revenue`          | Ingresos totales          |
| `GET`  | `/products/metrics/average-stock`          | Stock promedio            |
| `GET`  | `/products/metrics/top-expensive-products` | Top 5 productos más caros |
| `GET`  | `/products/metrics/price-distribution`     | Distribución de precios   |
| `GET`  | `/products/metrics/stock-vs-price`         | Relación Stock vs Precio  |

---

## ⚠️ Manejo de Errores con Middlewares

Se maneja con un **middleware global**:

```ts
import { ExceptionFilter, Catch, ArgumentsHost, HttpException, Logger } from '@nestjs/common';

@Catch(HttpException)
export class HttpErrorFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpErrorFilter.name);

 catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        const status = exception.getStatus
            ? exception.getStatus()
            : HttpStatus.INTERNAL_SERVER_ERROR;

        const exceptionResponse = exception.getResponse();
        let message = 'Ocurrió un error inesperado';
        let errors: Record<string, string[]> | undefined;

        if (typeof exceptionResponse === 'string') {
            message = exceptionResponse;
        } else if (typeof exceptionResponse === 'object' && exceptionResponse !== null) {
            message = (exceptionResponse as any).message || message;
            errors = (exceptionResponse as any).errors;
        }

        response.status(status).json(new ErrorResponse(message, status, errors));
    }
}
```

---

## 📜 Licencia

Este proyecto está bajo la licencia **MIT**. Puedes usarlo, modificarlo y distribuirlo libremente.

---

🎉 **¡Gracias por usar este Backend de Productos con NestJS!** 

