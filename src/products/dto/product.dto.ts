import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber } from 'class-validator';

export class ProductDto{
    @ApiProperty({ example: 1, description: 'ID único del producto' })
    @IsNumber()
    id?: number

    @ApiProperty({ example: 'Producto A', description: 'Nombre del producto' })
    @IsString()
    name: string

    @ApiProperty({ example: 100, description: 'Precio del producto' })
    @IsNumber()
    price: number

    @ApiProperty({ example: 20, description: 'Cantidad en stock del producto' })
    @IsNumber()
    stock: number
}
