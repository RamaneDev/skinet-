import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getOrders() {
    return this.http.get(this.baseUrl + 'orders');
  }
}
