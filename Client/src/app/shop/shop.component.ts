import { ShopService } from './shop.service';
import { HttpClient } from '@angular/common/http';
import { IProduct } from './../shared/models/Product';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

  products: IProduct[];
  
  constructor(private shopservice: ShopService) { }

  ngOnInit(): void {   
    this.getProduct(); 
  }

  getProduct(): void {

    this.shopservice.getProducts().subscribe({
      next: (response) => this.products = response.data,
      error: (e) => console.error(e),
      complete: () => console.info('complete')
    })

  }

}
