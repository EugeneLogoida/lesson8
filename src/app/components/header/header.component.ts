import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ROLE } from 'src/app/shared/constants/roles.constant';
import { IProductsResponse } from 'src/app/shared/interfaces/products/products.interface';
import { AccountService } from 'src/app/shared/services/account/account.service';
import { OrderService } from 'src/app/shared/services/order/order.service';
import { AuthDialogComponent } from '../auth-dialog/auth-dialog.component';
import { BasketComponent } from '../basket/basket.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public basket: Array<IProductsResponse> = [];
  public total = 0;
  public showBasket = false
  public showItems = true

  public isLogin = false;
  public loginUrl = '';
  public loginPage = ''

  constructor(
    private accountService: AccountService,
    private router: Router,
    public dialog: MatDialog,
    private orderService: OrderService
  ) { }

  ngOnInit(): void {
    this.checkUserLogin();
    this.loadBasket()
    this.checkUpdatesUserLogin()
    this.updateBasket();
    // console.log(this.basket);
    
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
    console.log(this.total);
    
  }

  updateBasket():void{
    this.orderService.changeBasket.subscribe(()=>{
      this.loadBasket()
    })
  }

  showBasketItems():void{
    this.showItems = !this.showItems
  }
  // qChange(b: boolean, product: IProductsResponse): void {
  //   if (b) {
  //     product.count++
  //   } else {
  //     if (product.count > 1) product.count--
  //   }
  // }

  checkUserLogin():void{
    const currentUser = JSON.parse(localStorage.getItem('currentUser') as string);
    if(currentUser && currentUser.role === ROLE.ADMIN){
      this.isLogin = true;
      this.loginUrl = 'admin';
      this.loginPage = 'Admin';
    } else if (currentUser && currentUser.role == ROLE.USER){
      this.isLogin = true;
      this.loginUrl = 'cabinet';
      this.loginPage = 'Cabinet';
    } else {
      this.isLogin = false;
      this.loginUrl = '';
      this.loginPage = '';
    }
  }
  checkUpdatesUserLogin():void{
    this.accountService.isUserLogin$.subscribe(()=>{
      this.checkUserLogin()
    })
  }

  logout():void{
    this.router.navigate(['/']);
    localStorage.removeItem('currentUser');
    this.accountService.isUserLogin$.next(true);
  }

  openLoginDialog():void{
    this.dialog.open(AuthDialogComponent, {
      backdropClass: 'dialog-back',
      panelClass: 'auth-dialog'
    }).afterClosed().subscribe(result =>{
      console.log(result);
      
    })
  }

  openBasketDialog(): void{
    this.showBasket = !this.showBasket;
    this.orderService.changeBasket.next(true);
    if(this.showBasket){
      this.dialog.open(BasketComponent, {
        backdropClass: 'basket-back',
        panelClass: 'basket-dialog',
        position: {top: '95px', right:'0px'},
        
      }).afterClosed().subscribe(()=>{
        this.showBasket = false
      })
    } else{
      this.dialog.closeAll()
    }
  }
}
