import { Component, OnInit } from '@angular/core';
import { IProductsResponse } from 'src/app/shared/interfaces/products/products.interface';
import { OrderService } from 'src/app/shared/services/order/order.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {


  public basket: Array<IProductsResponse> = [];
  public total = 0;
  
  constructor(
    private orderService: OrderService,
  ) { }

  ngOnInit(): void {
    this.loadBasket();
    this.updateBasket();
  }

  loadBasket():void{
    if(localStorage.length > 0 && localStorage.getItem('basket')){
      this.basket = JSON.parse(localStorage.getItem('basket') as string);
      console.log(this.basket);
      
    }
    this.getTotalPrice()
  }
  getTotalPrice():void{
    this.total = this.basket.
    reduce((total:number, prod:IProductsResponse)=> total + prod.count * prod.price, 0);
    // console.log(this.total);
    
  }

  updateBasket():void{
    this.orderService.changeBasket.subscribe(()=>{
      this.loadBasket()
    })
  }

  
  qChange(b: boolean, product: IProductsResponse): void {
    if (b) {
      product.count++;
    
    } else {
      if (product.count > 1) product.count--; 
    }
    
  }

}
