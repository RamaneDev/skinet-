import { Component, OnInit } from '@angular/core';
import { IOrder } from '../shared/models/Order';
import { OrdersService } from './orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  
  orders: IOrder[];
  
  constructor(private orderService: OrdersService) { }

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders() {
    this.orderService.getOrders().subscribe({
      next: (orders: IOrder[]) => this.orders = orders,
      error: (err) => console.log(err)
    });
  }

}
