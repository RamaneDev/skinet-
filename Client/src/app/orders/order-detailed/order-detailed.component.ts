import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IOrder } from 'src/app/shared/models/Order';
import { BreadcrumbService } from 'xng-breadcrumb';
import { OrdersService } from '../orders.service';

@Component({
  selector: 'app-order-detailed',
  templateUrl: './order-detailed.component.html',
  styleUrls: ['./order-detailed.component.scss'],
})
export class OrderDetailedComponent implements OnInit {
  order: IOrder;

  constructor(
    private orderService: OrdersService,
    private bcService: BreadcrumbService,
    private activateRoute: ActivatedRoute
  ) {
    this.bcService.set('@orderDetails', ' ');
  }

  ngOnInit(): void {
    this.getOrder();
  }

  getOrder() {
    const id = this.activateRoute.snapshot.paramMap.get('id');
    this.orderService.getOrder(+id).subscribe({
      next: (order: IOrder) => {
        this.order = order;
        this.bcService.set(
          '@orderDetails',
          'Order# ' + id + ' - ' + this.order.status
        );
      },
      error: (err) => console.log(err),
    });
  }
}
