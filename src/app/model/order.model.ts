import { Injectable } from "@angular/core"
import { Cart } from "./cart.model"

@Injectable()
export class Order{
    public id: number | undefined
    public name: string | undefined
    public address: string | undefined
    public city: string | undefined
    public state: string | undefined
    public zip: string | undefined
    public country: string | undefined
    public shipped: boolean = false

    constructor(public cart: Cart){}

    clear(){
        this.id = undefined
        this.name = this.address = this.city = undefined
        this.state = this.zip = this.country = undefined
        this.shipped = false

        this.cart.clear()
    }

    
}