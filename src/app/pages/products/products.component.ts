import { Component, OnInit } from '@angular/core';
import { IProductsResponse } from 'src/app/shared/interfaces/products/products.interface';
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
    private productsService: ProductsService
  ) { }

  ngOnInit(): void {
    this.loadProducts();
    
    
  }

  loadProducts():void{
    this.productsService.getAll().subscribe(data=>
      this.productsList = data)
  }

  qChange(b: boolean, product:IProductsResponse ):void{
    if(b){
      product.count++
    }else{
      if(product.count>1) product.count--
    }
  }
}
