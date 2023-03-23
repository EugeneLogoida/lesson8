import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProductsResponse } from 'src/app/shared/interfaces/products/products.interface';
import { OrderService } from 'src/app/shared/services/order/order.service';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.scss']
})
export class ProductInfoComponent implements OnInit {
  public currentProduct!:IProductsResponse;

  constructor(
    private activatedRoute: ActivatedRoute, 
    private orderService: OrderService
    ) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(response =>{
      this.currentProduct = response['productsInfo']
    })
    console.log();
    
  }
  qChange(b: boolean, product: IProductsResponse): void {
    if (b) {
      product.count++
    } else {
      if (product.count > 1) product.count--
    }
  }
  addToBasket(product:IProductsResponse):void{
    let basket: Array<IProductsResponse> = []
    if(localStorage.length > 0 && localStorage.getItem('basket')){
      basket = JSON.parse(localStorage.getItem('basket') as string);
      if(basket.some(prod => prod.id === product.id)){
        const index = basket.findIndex(prod => prod.id === product.id);
        basket[index].count += product.count;
      } else {
        basket.push(product)
      }
    } else {
      basket.push(product)
    }
    localStorage.setItem('basket', JSON.stringify(basket))
    product.count = 1;
    this.orderService.changeBasket.next(true);
  }

}
