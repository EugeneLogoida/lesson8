import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminActionsComponent } from './admin-actions/admin-actions.component';
import { AdminCategoriesComponent } from './admin-categories/admin-categories.component';
import { AdminProductsComponent } from './admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin-orders/admin-orders.component';
import { AdminComponent } from './admin.component';
import { SharedModule } from '../shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';



@NgModule({
  declarations: [
    AdminActionsComponent,
    AdminCategoriesComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    AdminComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
