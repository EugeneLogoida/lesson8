import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { ActionsComponent } from './pages/actions/actions.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { DeliveryAndPaymentComponent } from './pages/delivery-and-payment/delivery-and-payment.component';
import { ProductsComponent } from './pages/products/products.component';

import { OffertaComponent } from './pages/offerta/offerta.component';

import { AdminComponent } from './admin/admin.component'; 
import { AdminActionsComponent } from './admin/admin-actions/admin-actions.component';
import { AdminCategoriesComponent } from './admin/admin-categories/admin-categories.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'actions', component: ActionsComponent },
  { path: 'product/:category', component: ProductsComponent },
  { path: 'delivery-and-payment', component: DeliveryAndPaymentComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'offerta', component: OffertaComponent },
  { path: 'admin', component: AdminComponent, children: [
    { path: 'actions', component: AdminActionsComponent },
    { path: 'products', component: AdminProductsComponent },
    { path: 'categories', component: AdminCategoriesComponent },
    { path: 'orders', component: AdminOrdersComponent },
    { path: '', pathMatch: 'full', redirectTo: 'actions' }
  ] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
