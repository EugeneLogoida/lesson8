import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OffertaComponent } from './offerta.component';
import { SharedModule } from '../../shared/shared.module';
import { OffertaRoutingModule } from './offerta-routing.module';



@NgModule({
  declarations: [
    OffertaComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    OffertaRoutingModule
  ]
})
export class OffertaModule { }
