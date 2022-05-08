import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountService } from 'src/app/account/account.service';
import { BasketService } from 'src/app/basket/basket.service';
import { IBasket } from 'src/app/shared/models/Basket';
import { IUser } from 'src/app/shared/models/User';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
 
  basket$: Observable<IBasket>;
  currentUser$: Observable<IUser>;

  constructor(private basketservice: BasketService, private accountService: AccountService ) { }

  ngOnInit(): void {
    this.basket$ = this.basketservice.basket$;
    this.currentUser$ = this.accountService.currentUser$;
  }

  logout() {
    this.accountService.logout();
  }

}
