import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { CabinetRoutingModule } from './cabinet-routing.module';
import { CabinetComponent } from './cabinet.component';
import { UserDataComponent } from './user-data/user-data.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { PasswordChangeComponent } from './password-change/password-change.component';



@NgModule({
  declarations: [
    CabinetComponent,
    UserDataComponent,
    OrderHistoryComponent,
    PasswordChangeComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CabinetRoutingModule
  ]
})
export class CabinetModule { }
