import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { IProductsResponse } from '../../interfaces/products/products.interface';
import { ProductsService } from './products.service';

@Injectable({
  providedIn: 'root'
})
export class ProductInfoResolver implements Resolve<IProductsResponse> {
  
  constructor(private productService:ProductsService){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IProductsResponse> {
    return this.productService.getOne(Number(route.paramMap.get('id')));
  }
}
