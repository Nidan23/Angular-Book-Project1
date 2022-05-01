import { NgModule } from '@angular/core'
import { ProductRepository } from './product.respository'
import { StaticDataSource } from './static.datasource'
import { RestDataSource } from './rest.datasource'
import { HttpClientModule } from '@angular/common/http'
import { Cart } from './cart.model'
import { Order } from './order.model'
import { OrderRepository } from './order.repository'
import { AuthService } from './auth.service'
import { ConnectionService } from './connection.service'

@NgModule({
    imports: [HttpClientModule],
    providers: [ProductRepository, Cart,
        Order, OrderRepository, { provide: StaticDataSource, useClass: RestDataSource},
        RestDataSource, AuthService, ConnectionService]
})
export class ModelModule {}
