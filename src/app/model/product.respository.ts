import { Injectable } from "@angular/core"
import { Product } from "./product.model"
// import { StaticDataSource } from "./static.datasource"
import { RestDataSource } from "./rest.datasource"

@Injectable()
export class ProductRepository{
    private products: Product[] = []
    private categories: string[] = []

    constructor(private dataSource: RestDataSource){
        dataSource.getProducts().subscribe(data => {
            this.products = data
            this.categories = this.categoriesMiddleware(data)
        })
    }

    getProducts(category?: string): Product[]{
        if(category){
            return this.products
            .filter(p => category === p.category)
        } else {
            return this.products
        }
    }

    getProduct(id: number): Product{
        return this.productsMiddleware(this.products, id)
    }

    getCategories(): string[]{
        return this.categories
    }

    saveProduct(product: Product){
        if(!product.id)
            this.dataSource.saveProduct(product)
                .subscribe(p => this.products.push(p))
        else
            this.dataSource.updateProduct(product)
                .subscribe(p => {
                    this.products.splice(this.products
                            .findIndex(p => p.id == product.id), 1, product)
                })
    }

    deleteProduct(id: number) {
        this.dataSource.deleteProduct(id).subscribe(p => {
            this.products.splice(this.products
                    .findIndex(p => p.id == id), 1)
        })
    }

    private categoriesMiddleware(data: Product[]): string[] {
        let temporaryData: any = data.map(p => p.category)
            .filter((c, index, array) => array.indexOf(c) === index).sort()

        if(temporaryData){
            return temporaryData
        }else {
            return []
        }
    }

    private productsMiddleware(products: Product[], id: number): Product{
        let result: Product | undefined = products.find(p => p.id === id)
        if(result){
            return result
        } else{
            return new Product
        }
    }
}
