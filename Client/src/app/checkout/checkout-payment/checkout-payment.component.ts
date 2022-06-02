import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BasketService } from 'src/app/basket/basket.service';
import { IBasket } from 'src/app/shared/models/Basket';
import { IOrder, IOrderToCreate } from 'src/app/shared/models/Order';
import { CheckoutService } from '../checkout.service';

@Component({
  selector: 'app-checkout-payment',
  templateUrl: './checkout-payment.component.html',
  styleUrls: ['./checkout-payment.component.scss']
})
export class CheckoutPaymentComponent implements OnInit {

  @Input() checkoutForm: FormGroup;
  constructor(private basketService: BasketService, 
              private checkoutService: CheckoutService, 
              private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  submitOrder() {
    const basket = this.basketService.getCurrentBasketValue();
    const orderTocreate = this.getOrderToCreate(basket);
    this.checkoutService.createOrder(orderTocreate).subscribe({
      next: (order: IOrder) => { this.toastr.success('Order created successfully');
                                 this.basketService.deleteLocalBasket(basket.id);
                                 console.log(order); },
      error: error => {console.log(error.message);
                       this.toastr.error(error.message)}
         });
  }

  private getOrderToCreate(basket: IBasket): IOrderToCreate {
     return {
       basketId: basket.id,
       deliveryMethodId: +this.checkoutForm.get('deliveryForm').get('deliveryMethod').value,
       shipToAddress: this.checkoutForm.get('addressForm').value
     }
  }


}
