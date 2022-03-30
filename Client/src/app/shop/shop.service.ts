import { IPagination } from './../shared/models/Pagination';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProduct } from '../shared/models/Product';
import { IBrand } from '../shared/models/Brand';
import { IType } from '../shared/models/ProductType';


@Injectable({
  providedIn: 'root'
})
export class ShopService {

  baseUrl = 'https://localhost:5001/api/';
  
  constructor(private http: HttpClient) {}  

  getProducts() {    
    return this.http.get<IPagination>(this.baseUrl + 'products?pageSize=50');     
  }


  getProduct(id: number) {
    return this.http.get<IProduct>(this.baseUrl + 'products/' + id);
  }

  getBrands() {
    return this.http.get<IBrand[]>(this.baseUrl + 'products/brands');
  }

  getTypes() {
    return this.http.get<IType[]>(this.baseUrl + 'products/types');
  }

}
