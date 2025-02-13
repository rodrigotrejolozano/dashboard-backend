import { IsOptional, IsInt, Min } from 'class-validator';
import { Transform } from 'class-transformer';
import { FilterProductsDto } from './filterProduct.dto';
import { ApiProperty } from '@nestjs/swagger';

export class GetProductsDto extends FilterProductsDto {
    @ApiProperty({ example: 1, required: false, description: 'Número de la página (por defecto: 1)' })
    @IsOptional()
    @Transform(({ value }) => parseInt(value, 10))
    @IsInt()
    @Min(1)
    page?: number = 1;

    @ApiProperty({ example: 5, required: false, description: 'Cantidad de productos por página (por defecto: 5)' })
    @IsOptional()
    @Transform(({ value }) => parseInt(value, 10))
    @IsInt()
    @Min(1)
    limit?: number = 5;
}
