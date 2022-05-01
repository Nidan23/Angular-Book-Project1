import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { AppComponent } from './app.component'
import { StoreModule } from './store/store.module'
import { StoreComponent } from './store/store.component'
import { CheckoutComponent } from './store/checkout.component'
import { CartDetailComponent } from './store/cartDetail.component'
import { RouterModule } from '@angular/router'
import { StoreFirstGuard } from './storeFirst.guard'
import { registerLocaleData } from '@angular/common'
import localePL from '@angular/common/locales/pl';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment'
registerLocaleData(localePL)

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    StoreModule,
    RouterModule.forRoot([
      { path: 'store', component: StoreComponent, canActivate: [StoreFirstGuard]},
      { path: 'cart', component: CartDetailComponent, canActivate: [StoreFirstGuard]},
      { path: 'checkout', component: CheckoutComponent, canActivate: [StoreFirstGuard]},
      { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule), canActivate: [StoreFirstGuard]},
      { path: '**', redirectTo: '/store'}
    ]),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [StoreFirstGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }