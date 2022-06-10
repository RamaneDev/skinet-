import { environment } from './../../environments/environment';
import { ShopParams } from './../shared/models/ShopParams';
import { IPagination, Pagination } from './../shared/models/Pagination';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProduct } from '../shared/models/Product';
import { IBrand } from '../shared/models/Brand';
import { IType } from '../shared/models/ProductType';
import { map, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ShopService {

  
  baseUrl = environment.apiUrl;

  products: IProduct[] = [];
  brands: IBrand[] = [];
  types: IType[] = [];
  pagination = new Pagination();
  shopParams = new ShopParams();
  productCache = new Map();
  
  constructor(private http: HttpClient) {}  

  getProducts(useCache: boolean) {  
    
    if(useCache === false) {
      this.productCache = new Map();
    }

    if(this.productCache.size > 0 && useCache === true) {      
      if(this.productCache.has(Object.values(this.shopParams).join('-'))) {
       
        this.pagination = this.productCache.get(Object.values(this.shopParams).join('-'));        
        return of(this.pagination);
      }
    }

    
    
    let params = new HttpParams();

    if(this.shopParams.brandId !== 0) {
      params = params.append('brandId', this.shopParams.brandId.toString());
    }

    if(this.shopParams.typeId !== 0) {
      params = params.append('typeId', this.shopParams.typeId.toString());
    }

    if(this.shopParams.search) {
      params = params.append('search', this.shopParams.search);
    }

    params = params.append('sort', this.shopParams.sort);
    params = params.append('pageIndex', this.shopParams.pageNumber.toString());
    params = params.append('pageSize', this.shopParams.pageSize.toString());   
    
    return this.http.get<IPagination>(this.baseUrl + 'products', {observe: 'response', params})
        .pipe(
            map(response => {
              this.productCache.set(Object.values(this.shopParams).join('-'), response.body);
              this.pagination = response.body as IPagination;            
              return this.pagination;
            })
        );  
  }

  setShopParams(params: ShopParams) {
    this.shopParams = params;
  }

  getShopParams() {
    return this.shopParams;
  }

  getProduct(id: number) {
    let product : IProduct;

    const pagination = this.productCache.get(Object.values(this.shopParams).join('-')) as IPagination;
    
    for (let index = 0; index < pagination.data.length; index++) {
      if(pagination.data[index].id === id) {
        product = pagination.data[index];
        break;
      }      
    }

    if(product) {
      return of(product);
    }
    return this.http.get<IProduct>(this.baseUrl + 'products/' + id);
  }

  getBrands() {
    if(this.brands.length > 0) {
      return of(this.brands);
    }
    return this.http.get<IBrand[]>(this.baseUrl + 'products/brands').pipe(
      map(response => {
        this.brands = response;
        return response;
      })
    );
  }

  getTypes() {
    if(this.types.length > 0) {
      return of(this.types);
    }
    return this.http.get<IType[]>(this.baseUrl + 'products/types').pipe(
      map(response => {
        this.types = response;
        return response;
      })
    );
  }  

}
