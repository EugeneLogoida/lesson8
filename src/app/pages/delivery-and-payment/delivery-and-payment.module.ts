import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeliveryAndPaymentComponent } from './delivery-and-payment.component';
import { SharedModule } from '../../shared/shared.module';
import { DeliveryAndPaymentRoutingModule } from './delivery-and-payment-routing.module';




@NgModule({
  declarations: [
    DeliveryAndPaymentComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    DeliveryAndPaymentRoutingModule
  ]
})
export class DeliveryAndPaymentModule { }
