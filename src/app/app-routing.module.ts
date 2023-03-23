import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [

  { path: '',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule)

  },
  {
    path: 'about-us',
    loadChildren: () => import('./pages/about-us/about-us.module').then(m => m.AboutUsModule)
  },
  {
    path: 'actions',
    loadChildren: () => import('./pages/actions/actions.module').then(m => m.ActionsModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./pages/authorization/authorization.module').then(m => m.AuthorizationModule)
  },
  {
    path: 'cabinet',
    loadChildren: () => import('./pages/cabinet/cabinet.module').then(m => m.CabinetModule)
  },
  {
    path: 'delivery-and-payment',
    loadChildren: () => import('./pages/delivery-and-payment/delivery-and-payment.module')
      .then(m => m.DeliveryAndPaymentModule)
  },
  {
    path: 'offerta',
    loadChildren: () => import('./pages/offerta/offerta.module').then(m => m.OffertaModule)
  },
  {
    path: 'product',
    loadChildren: () => import('./pages/products/products.module').then(m => m.ProductsModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
