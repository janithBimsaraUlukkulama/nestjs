import { Injectable, NotFoundException } from "@nestjs/common";
import { Product } from "./product.modal";

@Injectable()
export class ProductsService {
    private products: Product[] = [];

    insertProduct(title: string, desc: string, price: number) {
        const id = Math.random().toString();
        console.log(desc);

        const newProduct = new Product(id, title, desc, price);
        this.products.push(newProduct);
        return id;
    }

    getProducts() {
        return [...this.products];
    }

    getSingleProduct(productId: string) {
        const product = this.products.find(prod => prod.id === productId);

        if (!product) {
            throw new NotFoundException('Could Not Found');
        }

        return { ...product };
    }

    updateProduct(prodId: string, title: string, desc: string, price: number) {
        const [product, index] = this.findProduct(prodId);
        const updatedProduct = { ...product };

        if (title) {
            updatedProduct.title = title;
        }
        if (desc) {
            updatedProduct.desc = desc;
        }
        if (price) {
            updatedProduct.price = price;
        }

        this.products[index] = updatedProduct;

    }

    private findProduct(productId: string): [Product, number] {
        const productIndex = this.products.findIndex(prod => prod.id === productId);
        const product = this.products[productIndex];
        if (!product) {
            throw new NotFoundException('Could Not Found');
        }
        return [product, productIndex];
    }

    deleteProduct(productId: string) {
        const index = this.findProduct(productId)[1];
        this.products.splice(index, 1);
    }
}