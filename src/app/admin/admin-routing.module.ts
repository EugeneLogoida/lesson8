import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AdminComponent} from "./admin.component";
import {AuthGuard} from "../shared/guards/auth/auth.guard";
import {AdminActionsComponent} from "./admin-actions/admin-actions.component";
import {AdminProductsComponent} from "./admin-products/admin-products.component";
import {AdminCategoriesComponent} from "./admin-categories/admin-categories.component";
import {AdminOrdersComponent} from "./admin-orders/admin-orders.component";


const routes: Routes = [
  { path: '', component: AdminComponent, canActivate: [AuthGuard] , children: [
      { path: 'actions', component: AdminActionsComponent },
      { path: 'products', component: AdminProductsComponent },
      { path: 'categories', component: AdminCategoriesComponent },
      { path: 'orders', component: AdminOrdersComponent },
      { path: '', pathMatch: 'full', redirectTo: 'actions' }
    ]
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AdminRoutingModule { }
