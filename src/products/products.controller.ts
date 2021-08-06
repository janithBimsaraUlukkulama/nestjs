import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { ProductsService } from "./products.service";

@Controller('products')
export class ProductController {
    constructor(private readonly productService: ProductsService) { }

    @Post()
    addProduct(
        @Body('title') prodTitle: string,
        @Body('description') prodDesc: string,
        @Body('price') prodPrice: number): any {
        const generatedId = this.productService.insertProduct(prodTitle, prodDesc, prodPrice);
        return { id: generatedId }
    }

    @Get()
    getAllProducts() {
        return this.productService.getProducts();
    }

    @Get(':id')
    getProduct(@Param('id') prodId: string) {
        return this.productService.getSingleProduct(prodId);
    }

    @Patch(':id')
    updateProduct(@Param('id') prodId: string, @Body('title') prodTitle: string, @Body('description') prodDesc: string, @Body('price') prodPrice: number) {
        this.productService.updateProduct(prodId, prodTitle, prodDesc, prodPrice);
        return null;
    }

    @Delete(':id')
    removeProduct(@Param('id') prodId: string) {
        this.productService.deleteProduct(prodId);
        return null;
    }

}