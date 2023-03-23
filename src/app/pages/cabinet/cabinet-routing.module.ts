import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {CabinetComponent} from "./cabinet.component";
import {AuthUserGuard} from "../../shared/guards/auth/auth-user.guard";
import {UserDataComponent} from "./user-data/user-data.component";
import {OrderHistoryComponent} from "./order-history/order-history.component";
import {PasswordChangeComponent} from "./password-change/password-change.component";

const routes: Routes = [
  { path: '', component: CabinetComponent, canActivate: [AuthUserGuard], children:[
      {path: 'user-data', component: UserDataComponent },
      {path: 'order-history', component: OrderHistoryComponent },
      {path: 'password-change', component: PasswordChangeComponent },
      { path: '', pathMatch: 'full', redirectTo: 'user-data' }
    ] },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class CabinetRoutingModule { }
