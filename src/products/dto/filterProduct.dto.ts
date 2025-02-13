import { IsOptional, IsInt, Min } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class FilterProductsDto {
    @ApiProperty({ example: 'Producto A', required: false, description: 'Filtrar por nombre' })
    @IsOptional()
    name?: string;

    @ApiProperty({ example: 100, required: false, description: 'Filtrar por precio exacto' })
    @IsOptional()
    @Transform(({ value }) => parseInt(value, 10))
    @IsInt()
    price?: number;

    @ApiProperty({ example: 20, required: false, description: 'Filtrar por stock exacto' })
    @IsOptional()
    @Transform(({ value }) => parseInt(value, 10))
    @IsInt()
    stock?: number;
}
