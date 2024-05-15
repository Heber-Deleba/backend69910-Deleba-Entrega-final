import fs from 'fs';
import { v4 as uuidv4 } from "uuid";

export default class ProductManager {
    constructor(path) {
        this.path = path;
    }

    async getProducts( limit ) {
        try{
            if(fs.existsSync(this.path)) {
                const products = await fs.promises.readFile(this.path, "utf8");
                const parsedProducts = JSON.parse(products);
            if (!limit) {
                return parsedProducts;
            }
            const limitedProducts = parsedProducts.slice(0, limit);
            const additionalProducts = parsedProducts.slice(0, limit - 1);
            return {
                limited: limitedProducts,
                additional: additionalProducts
            };
        } else {
            return [];
        }
    } catch (error) {
        console.log(error);
        throw new Error('Error al obtener productos');
    }
}

    async createProduct(obj){
        try{
            const product = {
                id: uuidv4(),
                status: true,
                ...obj,
            };
            const products = await this.getProducts();
            products.push(product);
            await fs.promises.writeFile(this.path, JSON.stringify(products));
            return product;
        } catch (error){
            console.log(error);
        }
    }

    async getProductById (id) {
        try{
            const products = await this.getProducts();
            const productsExist = products.find((p) => p.id === id);
            if (!productsExist) return null;
            return productsExist;
        } catch (error){
            console.log(error);
        }
    }

    async updateProduct(obj, id){
        try{
            const products = await this.getProducts();
            let productsExist = await this.getProductById(id);
            if(!productsExist) return null;
            productsExist = {...productsExist, ...obj };
            const newArray = products.filter((u) => u.id !== id);
            newArray.push(productsExist);
            await fs.promises.writeFile(this.path, JSON.stringify(newArray));
            return productsExist;
        }catch (error){
            console.log(error);
        }
    }


    async deleteProduct(id) {
        const products = await this.getProducts();
        if (products.length > 0) {
            const productsExist = await this.getProductById(id);
            if (productsExist) {
                const newArray = products.filter((u)=> u.id !== id);
                await fs.promises.writeFile(this.path, JSON.stringify(newArray));
                return productsExist
            }
        } else return null 
    }


    async deleteFile() {
        try{
            await fs.promises.unlink(this.path);
            console.log("archivo eliminado")
        } catch (error){
            console.log(error);
        }
    }
}