import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { IActionsResponse } from '../../interfaces/actions/actions.interface';
import { ActionsService } from './actions.service';

@Injectable({
  providedIn: 'root'
})
export class ActionsInfoResolver implements Resolve<IActionsResponse> {

  constructor(private actionsService:ActionsService){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IActionsResponse> {
    return this.actionsService.getOne(Number(route.paramMap.get('id')));
  }
}
