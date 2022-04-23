import { IProduct } from './../../shared/models/Product';
import { Component, Input, OnInit } from '@angular/core';
import { BasketService } from 'src/app/basket/basket.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {

  @Input() product:IProduct;
  
  constructor(private basketservice: BasketService) { }

  ngOnInit(): void {

  }

  public addItemToBasket() {
    this.basketservice.addItemToBasket(this.product);
  }

}
