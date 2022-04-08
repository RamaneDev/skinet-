import { IProduct } from './../../shared/models/Product';
import { ShopService } from './../shop.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  product: IProduct;

  constructor(private shopservice: ShopService,
              private activateRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getProduct();
  }


  getProduct() {
    this.shopservice.getProduct(+this.activateRoute.snapshot.paramMap.get('id')).subscribe({
      next: (response) => this.product = response,
      error: (e) => console.log(e)
    })
  }

}
