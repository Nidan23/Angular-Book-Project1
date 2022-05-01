import { Component } from "@angular/core"
import { Product } from "../model/product.model"
import { ProductRepository } from "../model/product.respository"

@Component({
   templateUrl: 'productTable.component.html'
})
export class ProductTableComponent {
    constructor(private repository: ProductRepository){}

    getProducts(): Product[]{
        return this.repository.getProducts()
    }

    deleteProduct(id: number | undefined){
        if(id)
            this.repository.deleteProduct(id)
    }
}