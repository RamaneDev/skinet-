import { IPagination } from './../shared/models/Pagination';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ShopService {

  baseUrl = 'https://localhost:5001/api/';
  
  constructor(private http: HttpClient) {}  

  getProducts() {    
    return this.http.get<IPagination>(this.baseUrl + 'products?pageSize=6');     
  }

}
