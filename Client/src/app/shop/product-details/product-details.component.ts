import { BreadcrumbService } from 'xng-breadcrumb';
import { IProduct } from './../../shared/models/Product';
import { ShopService } from './../shop.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BasketComponent } from 'src/app/basket/basket.component';
import { BasketService } from 'src/app/basket/basket.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  product: IProduct;

  quantity = 1;

  constructor(private shopservice: ShopService,
              private activateRoute: ActivatedRoute,
              private basketservice: BasketService,
              private bcService: BreadcrumbService) { 
                this.bcService.set('@productDetails', ' ');
              }

  ngOnInit(): void {
    this.getProduct();
  }

  incrementQuantity() {
    this.quantity++;
  }

  decrementQuantity() {
    if(this.quantity > 1) {
      this.quantity--;
    }
  }

  addProductToBasket() {
     this.basketservice.addItemToBasket(this.product, this.quantity);
  }


  getProduct() {
    this.shopservice.getProduct(+this.activateRoute.snapshot.paramMap.get('id')).subscribe({
      next: (response) => {this.product = response;
                           this.bcService.set('@productDetails', this.product.name)},
      error: (e) => console.log(e)
    })
  }

}
