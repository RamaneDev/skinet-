import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Basket, IBasket, IBasketItem } from '../shared/models/Basket';
import { IProduct } from '../shared/models/Product';

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  baseUrl = environment.apiUrl;
  private basketSource = new BehaviorSubject<IBasket>(null);
  basket$ = this.basketSource.asObservable();
  
  constructor(private http: HttpClient) { }

  getBasket(id: string) {
    return this.http.get(this.baseUrl + 'basket?id=' + id)
      .pipe(
        map((basket: IBasket) => {
          this.basketSource.next(basket);          
        })
      );
  }


  setBasket(basket: IBasket) {
    return this.http.post(this.baseUrl + 'basket', basket).subscribe({
      next: (response: IBasket) => this.basketSource.next(response) ,
      error: (e) => console.log(e)
     }     
    );
  }

  addItemToBasket(item : IProduct, quantity = 1) {
    const itemToAdd: IBasketItem = this.mapProdcutItemToBasketItem(item, quantity);
    let basket = this.getCurrentBasketValue();    
    if(basket === null) {
        basket = this.createBasket();
    }
    basket.items = this.addOrUpdateItem(basket.items, itemToAdd, quantity);
    this.setBasket(basket);
  } 
  
  private addOrUpdateItem(items: IBasketItem[], itemToAdd: IBasketItem, quantity: number): IBasketItem[] {
    const index = items.findIndex(i => i.id === itemToAdd.id);
    if(index === -1) {
      itemToAdd.quantity = quantity;
      items.push(itemToAdd); 
    } else {
      items[index].quantity += quantity;
    }
    return items;
  }
  
  private createBasket(): IBasket {
    const basket = new Basket();
    localStorage.setItem('basket_id', basket.id);
    return basket;
  }
  
  
  private getCurrentBasketValue(): IBasket {
    return this.basketSource.value;
  }
  
  
  private mapProdcutItemToBasketItem(item: IProduct, quantity: number): IBasketItem {
    return {
      id: item.id,
      productName: item.name,
      price: item.price,
      pictureUrl: item.pictureUrl,
      quantity,
      brand: item.productBrand,
      type: item.productType
    };
  }
}
