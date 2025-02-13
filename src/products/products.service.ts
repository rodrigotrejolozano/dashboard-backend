import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { ProductDto } from './dto/product.dto';
import { PaginationResponse } from 'src/common/responses/pagination-response';

@Injectable()
export class ProductsService {
    private products: ProductDto[] = [
        { id: 1, name: 'Producto A', price: 100, stock: 20 },
        { id: 2, name: 'Producto B', price: 200, stock: 15 },
        { id: 3, name: 'Producto C', price: 300, stock: 10 },
        { id: 4, name: 'Producto D', price: 400, stock: 5 },
        { id: 5, name: 'Producto E', price: 500, stock: 0 },
        { id: 6, name: 'Producto F', price: 600, stock: 0 },
        { id: 7, name: 'Producto G', price: 700, stock: 0 },
        { id: 8, name: 'Producto H', price: 800, stock: 0 },
        { id: 9, name: 'Producto I', price: 900, stock: 0 },
        { id: 10, name: 'Producto J', price: 1000, stock: 0 },
        { id: 11, name: 'Producto K', price: 1100, stock: 0 },
        { id: 12, name: 'Producto L', price: 1200, stock: 0 },
        { id: 13, name: 'Producto M', price: 1300, stock: 0 },
        { id: 14, name: 'Producto N', price: 1400, stock: 0 },
        { id: 15, name: 'Producto O', price: 1500, stock: 0 },
        { id: 16, name: 'Producto P', price: 1600, stock: 0 },
        { id: 17, name: 'Producto Q', price: 1700, stock: 0 },
        { id: 18, name: 'Producto R', price: 1800, stock: 0 },
        { id: 19, name: 'Producto S', price: 1900, stock: 0 },
        { id: 20, name: 'Producto T', price: 2000, stock: 0 },
        { id: 21, name: 'Producto U', price: 2100, stock: 0 },
        { id: 22, name: 'Producto V', price: 2200, stock: 0 },
        { id: 23, name: 'Producto W', price: 2300, stock: 0 },
        { id: 24, name: 'Producto X', price: 2400, stock: 0 },
        { id: 25, name: 'Producto Y', price: 2500, stock: 0 },
        { id: 26, name: 'Producto Z', price: 2600, stock: 0 }
    ];

    getProducts(query: { page?: number; limit?: number ; name?: string; price?: number; stock?: number }) {
        try {
            let filteredProducts = [...this.products];

            if (query.name) {
                filteredProducts = filteredProducts.filter(product =>
                    product.name.toLowerCase().includes(query.name.toLowerCase())
                );
            }
            if (query.price) {
                filteredProducts = filteredProducts.filter(product =>
                    product.price.toString().includes(query.price!.toString())
                );
            }
            if (query.stock) {
                filteredProducts = filteredProducts.filter(product =>
                    product.stock.toString().includes(query.stock!.toString())
                );
            }

            const page = query.page ? Number(query.page) : 1;
            const limit = query.limit ? Number(query.limit) : 5;

            if (isNaN(page) || isNaN(limit) || page <= 0 || limit <= 0) {
                throw new BadRequestException('Los parámetros de paginación deben ser números positivos');
            }

            const startIndex = (page - 1) * limit;
            const endIndex = page * limit;
            const paginatedData = filteredProducts.slice(startIndex, endIndex);
            return new PaginationResponse(paginatedData, filteredProducts.length, page, limit);
        } catch (error) {
            throw error;
        }
    }

    getProduct(id: number) {
        try {
            if (isNaN(id) || id <= 0) {
                throw new BadRequestException('El ID debe ser un número positivo');
            }

            const product = this.products.find(product => product.id === id);
            if (!product) {
                throw new NotFoundException(`Producto con ID ${id} no encontrado`);
            }

            return product;
        } catch (error) {
            throw error;
        }
    }

    createProduct(product: Omit<ProductDto, 'id'>) {
        try {
            if (!product.name || !product.price || !product.stock) {
                throw new BadRequestException('Todos los campos (name, price, stock) son obligatorios');
            }

            const newProduct = {
                id: this.products.length + 1,
                ...product
            };
            this.products.push(newProduct);
            return newProduct;
        } catch (error) {
            throw error;
        }
    }

    updateProduct(id: number, product: Omit<ProductDto, 'id'>) {
        try {
            if (isNaN(id) || id <= 0) {
                throw new BadRequestException('El ID debe ser un número positivo');
            }

            const index = this.products.findIndex(p => p.id === id);
            if (index === -1) {
                throw new NotFoundException(`Producto con ID ${id} no encontrado`);
            }

            this.products[index] = { id, ...product };
            return this.products[index];
        } catch (error) {
            throw error;
        }
    }

    deleteProduct(id: number) {
        try {
            if (isNaN(id) || id <= 0) {
                throw new BadRequestException('El ID debe ser un número positivo');
            }

            const index = this.products.findIndex(p => p.id === id);
            if (index === -1) {
                throw new NotFoundException(`Producto con ID ${id} no encontrado`);
            }

            this.products.splice(index, 1);
            return { message: `Producto con ID ${id} eliminado` };
        } catch (error) {
            throw error;
        }
    }

    private filterProducts(query: { name?: string; price?: number; stock?: number }) {
        let filteredProducts = [...this.products];

        if (query.name && query.name.trim() !== "") {
            filteredProducts = filteredProducts.filter(product =>
                product.name.toLowerCase().includes(query.name!.toLowerCase())
            );
        }

        if (query.price !== undefined) { 
            filteredProducts = filteredProducts.filter(product =>
                product.price.toString().includes(query.price!.toString())
            );
        }

        if (query.stock !== undefined) { 
            filteredProducts = filteredProducts.filter(product =>
                product.stock.toString().includes(query.stock!.toString())
            );
        }

        return filteredProducts;
    }


    getTotalProducts(query: { name?: string; price?: number; stock?: number }) {
        const filteredProducts = this.filterProducts(query);
        return filteredProducts.length ;
    }

    getTotalRevenue(query: { name?: string; price?: number; stock?: number }) {
        const filteredProducts = this.filterProducts(query);
        const totalRevenue = filteredProducts.reduce((acc, product) => acc + product.price * product.stock, 0);
        return totalRevenue 
    }
    getAverageStock(query: { name?: string; price?: number; stock?: number }) {
        const filteredProducts = this.filterProducts(query);
        const avgStock = filteredProducts.length > 0
            ? filteredProducts.reduce((acc, product) => acc + product.stock, 0) / filteredProducts.length
            : 0;
        return avgStock 
    }
    getTopExpensiveProducts(query: { name?: string; price?: number; stock?: number }) {
        const filteredProducts = this.filterProducts(query);
        const topExpensiveProducts = [...filteredProducts]
            .sort((a, b) => b.price - a.price)
            .slice(0, 5);
        return topExpensiveProducts 
    }

    getPriceDistribution(query: { name?: string; price?: number; stock?: number }) {
        const filteredProducts = this.filterProducts(query);
        const priceDistribution = filteredProducts.reduce((acc, product) => {
            const range = Math.floor(product.price / 200) * 200;
            acc[range] = (acc[range] || 0) + 1;
            return acc;
        }, {});
        return priceDistribution 
    }
    getStockVsPrice(query: { name?: string; price?: number; stock?: number }) {
        const filteredProducts = this.filterProducts(query);
        const stockVsPrice = filteredProducts.map(product => ({
            name: product.name,
            price: product.price,
            stock: product.stock
        }));
        return stockVsPrice 
    }

}
