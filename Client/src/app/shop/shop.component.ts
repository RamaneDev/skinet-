import { IType } from './../shared/models/ProductType';
import { IBrand } from './../shared/models/Brand';
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
  brands: IBrand[];
  types: IType[];
  sortOptions = [
    {name: 'Alphabetical', value: 'name'},
    {name: 'Price: Low to Hight', value: 'priceAsc'},
    {name: 'Price: High to Low', value: 'priceDesc'}
  ]
  
  constructor(private shopservice: ShopService) { }

  ngOnInit(): void {   
    this.getProducts();
    this.getBrands();
    this.getTypes();
  }

  getProducts(): void {

    this.shopservice.getProducts().subscribe({
      next: (response) => this.products = response.data,
      error: (e) => console.error(e)
    })
  }

  getBrands(){
    this.shopservice.getBrands().subscribe({
      next: (response) => this.brands = response,
      error: (e) => console.error(e)
    })
    
  }


  getTypes() {
    this.shopservice.getTypes().subscribe({
      next: (response) => this.types = response,
      error: (e) => console.log(e)
    })
  }



}
