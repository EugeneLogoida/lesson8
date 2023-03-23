import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {ProductsComponent} from "./products.component";
import {ProductInfoComponent} from "./product-info/product-info.component";
import {ProductInfoResolver} from "../../shared/services/products/product-info.resolver";

const routes: Routes = [
  {
    path: ':category', component: ProductsComponent
  },
  { path: ':category/:id', component: ProductInfoComponent, resolve: { productsInfo:ProductInfoResolver } }

]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ProductsRoutingModule { }
