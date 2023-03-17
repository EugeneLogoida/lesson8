import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { IProductsResponse } from 'src/app/shared/interfaces/products/products.interface';
import { OrderService } from 'src/app/shared/services/order/order.service';
import { ProductsService } from 'src/app/shared/services/products/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  // public quantity = 1;


  public productsList: Array<IProductsResponse> = [];
  constructor(
    private productsService: ProductsService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private orderService: OrderService
  ) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.loadProducts()
      }
    })
  }

  ngOnInit(): void {
    this.loadProducts();


  }

  loadProducts(): void {
    const categoryName = this.activatedRoute.snapshot.paramMap.get('category') as string;
    
    this.productsService.getAllByCategory(categoryName).subscribe(data =>
      this.productsList = data)
    // this.productsService.getAll().subscribe(data=>{
    //   this.productsList = data
    // })
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
