import { IType } from './../shared/models/ProductType';
import { IBrand } from './../shared/models/Brand';
import { ShopService } from './shop.service';
import { IProduct } from './../shared/models/Product';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ShopParams } from '../shared/models/ShopParams';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

  @ViewChild('search',{static: false}) searchLable: ElementRef;
  
  products: IProduct[];
  brands: IBrand[];
  types: IType[];
  totalCount: number;
  shopParams :ShopParams;

  sortOptions = [
    {name: 'Alphabetical', value: 'name'},
    {name: 'Price: Low to Hight', value: 'priceAsc'},
    {name: 'Price: High to Low', value: 'priceDesc'}
  ]
  
  constructor(private shopservice: ShopService) {
    this.shopParams = this.shopservice.getShopParams();
   }

  ngOnInit(): void {   
    this.getProducts(true);
    this.getBrands();
    this.getTypes();
  }

  getProducts(useCache = false){

    this.shopservice.getProducts(useCache).subscribe({
      next: (response) => {
                           this.products = response.data;
                           this.totalCount = response.count;                          
                          },
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
    this.shopParams = this.shopservice.getShopParams();
    this.shopParams.brandId = idBrand;   
    this.shopParams.pageNumber = 1;
    this.shopservice.setShopParams(this.shopParams);
    this.getProducts();
  }

  onTypeSelected(idType: number) {
    this.shopParams= this.shopservice.getShopParams();
    this.shopParams.typeId = idType;
    this.shopParams.pageNumber = 1;
    this.shopservice.setShopParams(this.shopParams);
    this.getProducts();
  }

  onSortSelected(sort: string) {
    this.shopParams = this.shopservice.getShopParams();
    this.shopParams.sort = sort;
    this.shopParams.pageNumber = 1;
    this.shopservice.setShopParams(this.shopParams);
    this.getProducts();
  }

  onPageChanged(event: any) {
    this.shopParams= this.shopservice.getShopParams();  
    if (this.shopParams.pageNumber !== event) {
      this.shopParams.pageNumber = event.page;
      this.shopservice.setShopParams(this.shopParams);
      this.getProducts(true);
    }
  }

  onSearch() {
    this.shopParams = this.shopservice.getShopParams();  
    this.shopParams.search = this.searchLable.nativeElement.value;
    this.shopservice.setShopParams(this.shopParams);
    this.getProducts();
  }

  onReset() {
    this.shopParams= new ShopParams();   
    this.searchLable.nativeElement.value = '';
    this.shopservice.setShopParams(this.shopParams);   
    this.getProducts();
  }
}
