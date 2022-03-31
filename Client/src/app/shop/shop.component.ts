import { IType } from './../shared/models/ProductType';
import { IBrand } from './../shared/models/Brand';
import { ShopService } from './shop.service';
import { HttpClient } from '@angular/common/http';
import { IProduct } from './../shared/models/Product';
import { Component, OnInit } from '@angular/core';
import { ShopParams } from '../shared/models/ShopParams';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

  products: IProduct[];
  brands: IBrand[];
  types: IType[];
  shopParams = new ShopParams();
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

  getProducts(){

    this.shopservice.getProducts(this.shopParams).subscribe({
      next: (response) => this.products = response.data,
      error: (e) => console.error(e)
    })
  }

  getBrands(){
    this.shopservice.getBrands().subscribe({
      next: (response) => this.brands = [{name:"All", id:0 },...response],
      error: (e) => console.error(e)
    })
    
  }


  getTypes() {
    this.shopservice.getTypes().subscribe({
      next: (response) => this.types = [{name:"All", id:0 },...response],
      error: (e) => console.log(e)
    })
  }

  onBrandSelected(idBrand: number) {
    this.shopParams.brandId = idBrand;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }

  onTypeSelected(idType: number) {
    this.shopParams.typeId = idType;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }

  onSortSelected(sort: string) {
    this.shopParams.sort = sort;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }

}
