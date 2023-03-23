import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActionsComponent } from "./actions.component";
import { ActionsInfoComponent } from "./actions-info/actions-info.component";
import { ActionsInfoResolver } from "../../shared/services/actions/actions-info.resolver";

const routes: Routes = [
  {
    path: '', component: ActionsComponent
  },
  { path: ':id', component: ActionsInfoComponent,
    resolve:
      {
        actionsInfo: ActionsInfoResolver
      }
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ActionsRoutingModule { }
