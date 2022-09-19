import { Component, OnInit } from '@angular/core';
import { reduce } from 'rxjs';
import { IProductsResponse } from 'src/app/shared/interfaces/products/products.interface';
import { OrderService } from 'src/app/shared/services/order/order.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public basket: Array<IProductsResponse> = [];
  public total = 0;
  public showItems:boolean = false

  constructor(
    private orderService: OrderService
  ) { }

  ngOnInit(): void {
    this.loadBasket();
    this.updateBasket();
    console.log(this.basket);
    
  }

  loadBasket():void{
    if(localStorage.length > 0 && localStorage.getItem('basket')){
      this.basket = JSON.parse(localStorage.getItem('basket') as string);
      
    }
    this.getTotalPrice()
  }
  getTotalPrice():void{
    this.total = this.basket.
    reduce((total:number, prod:IProductsResponse)=> total + prod.count * prod.price, 0)
  }

  updateBasket():void{
    this.orderService.changeBasket.subscribe(()=>{
      this.loadBasket()
    })
  }

  showBasketItems():void{
    this.showItems = !this.showItems
  }
  qChange(b: boolean, product: IProductsResponse): void {
    if (b) {
      product.count++
    } else {
      if (product.count > 1) product.count--
    }
  }

}
