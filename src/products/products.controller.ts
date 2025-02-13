import {
    Controller, Get, Post, Put, Delete, Body, Param, Query, ParseIntPipe, UsePipes, ValidationPipe
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery, ApiParam, ApiBody } from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { ProductDto } from './dto/product.dto';
import { GetProductsDto } from './dto/get-products.dto';
import { FilterProductsDto } from './dto/filterProduct.dto';

@ApiTags('Productos')
@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) { }

    @Get()
    @ApiOperation({ summary: 'Obtener productos paginados', description: 'Devuelve una lista de productos con filtros opcionales.' })
    @ApiQuery({ name: 'page', required: false, type: Number, description: 'Número de página (por defecto: 1)' })
    @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Cantidad de productos por página (por defecto: 5)' })
    @ApiQuery({ name: 'name', required: false, type: String, description: 'Filtrar por nombre del producto' })
    @ApiQuery({ name: 'price', required: false, type: Number, description: 'Filtrar por precio exacto' })
    @ApiQuery({ name: 'stock', required: false, type: Number, description: 'Filtrar por cantidad exacta en stock' })
    @ApiResponse({
        status: 200,
        description: 'Lista de productos paginada',
        schema: {
            example: {
                data: [
                    { id: 1, name: 'Producto A', price: 100, stock: 20 },
                    { id: 2, name: 'Producto B', price: 200, stock: 15 }
                ],
                total: 2,
                page: 1,
                limit: 5
            }
        }
    })
    @UsePipes(new ValidationPipe({ transform: true }))
    getAllProducts(@Query() query: GetProductsDto) {
        return this.productsService.getProducts(query);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Obtener un producto por ID' })
    @ApiParam({ name: 'id', type: Number, description: 'ID del producto a obtener' })
    @ApiResponse({
        status: 200,
        description: 'Detalles del producto',
        type: ProductDto
    })
    @ApiResponse({ status: 404, description: 'Producto no encontrado' })
    getProductById(@Param('id', ParseIntPipe) id: number) {
        return this.productsService.getProduct(id);
    }

    @Post()
    @ApiOperation({ summary: 'Crear un nuevo producto' })
    @ApiBody({
        description: 'Datos del producto a crear',
        required: true,
        schema: {
            example: { name: 'Producto Nuevo', price: 500, stock: 30 }
        }
    })
    @ApiResponse({
        status: 201,
        description: 'Producto creado exitosamente',
        schema: {
            example: { id: 27, name: 'Producto Nuevo', price: 500, stock: 30 }
        }
    })
    @ApiResponse({ status: 400, description: 'Datos inválidos' })
    createProduct(@Body() product: Omit<ProductDto, 'id'>) {
        return this.productsService.createProduct(product);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Actualizar un producto' })
    @ApiParam({ name: 'id', type: Number, description: 'ID del producto a actualizar' })
    @ApiBody({ type: ProductDto, description: 'Datos actualizados del producto' })
    @ApiResponse({ status: 200, description: 'Producto actualizado exitosamente' })
    @ApiResponse({ status: 404, description: 'Producto no encontrado' })
    updateProduct(@Param('id', ParseIntPipe) id: number, @Body() product: Omit<ProductDto, 'id'>) {
        return this.productsService.updateProduct(id, product);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Eliminar un producto' })
    @ApiParam({ name: 'id', type: Number, description: 'ID del producto a eliminar' })
    @ApiResponse({ status: 200, description: 'Producto eliminado exitosamente' })
    @ApiResponse({ status: 404, description: 'Producto no encontrado' })
    deleteProduct(@Param('id', ParseIntPipe) id: number) {
        return this.productsService.deleteProduct(id);
    }

    @Get('/metrics/total-products')
    @ApiOperation({ summary: 'Obtener total de productos' })
    @ApiResponse({
        status: 200,
        description: 'Cantidad total de productos',
        schema: { example: { totalProducts: 26 } }
    })
    getTotalProducts(@Query() query: FilterProductsDto) {
        return this.productsService.getTotalProducts(query);
    }

    @Get('/metrics/total-revenue')
    @ApiOperation({ summary: 'Obtener ingresos totales' })
    @ApiResponse({
        status: 200,
        description: 'Suma total del valor de los productos en stock',
        schema: { example: { totalRevenue: 12000 } }
    })
    getTotalRevenue(@Query() query: FilterProductsDto) {
        return this.productsService.getTotalRevenue(query);
    }

    @Get('/metrics/average-stock')
    @ApiOperation({ summary: 'Obtener stock promedio', description: 'Calcula el promedio de stock de todos los productos después de aplicar filtros.' })
    @ApiResponse({
        status: 200,
        description: 'Stock promedio de los productos',
        schema: { example: { averageStock: 15 } }
    })
    getAverageStock(@Query() query: FilterProductsDto) {
        return this.productsService.getAverageStock(query);
    }

    @Get('/metrics/top-expensive-products')
    @ApiOperation({ summary: 'Obtener los 5 productos más caros', description: 'Devuelve un listado con los 5 productos más costosos.' })
    @ApiResponse({
        status: 200,
        description: 'Lista de los 5 productos más caros',
        schema: {
            example: [
                { name: 'Producto A', price: 500 },
                { name: 'Producto B', price: 450 }
            ]
        }
    })
    getTopExpensiveProducts(@Query() query: FilterProductsDto) {
        return this.productsService.getTopExpensiveProducts(query);
    }

    @Get('/metrics/price-distribution')
    @ApiOperation({ summary: 'Obtener distribución de precios', description: 'Retorna la cantidad de productos en diferentes rangos de precios.' })
    @ApiResponse({
        status: 200,
        description: 'Distribución de precios',
        schema: {
            example: {
                '1': 5,
                '2': 10,
                '3': 3
            }
        }
    })
    getPriceDistribution(@Query() query: FilterProductsDto) {
        return this.productsService.getPriceDistribution(query);
    }

    @Get('/metrics/stock-vs-price')
    @ApiOperation({ summary: 'Obtener relación Stock vs Precio', description: 'Muestra cómo varía el stock en función del precio.' })
    @ApiResponse({
        status: 200,
        description: 'Relación Stock vs Precio',
        schema: {
            example: [
                { price: 100, stock: 10 },
                { price: 200, stock: 5 }
            ]
        }
    })
    getStockVsPrice(@Query() query: FilterProductsDto) {
        return this.productsService.getStockVsPrice(query);
    }
}
