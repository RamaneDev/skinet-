import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { lastValueFrom } from 'rxjs';
import { BasketService } from 'src/app/basket/basket.service';
import { IBasket } from 'src/app/shared/models/Basket';
import { IOrder, IOrderToCreate } from 'src/app/shared/models/Order';
import { CheckoutService } from '../checkout.service';

declare var Stripe;

@Component({
  selector: 'app-checkout-payment',
  templateUrl: './checkout-payment.component.html',
  styleUrls: ['./checkout-payment.component.scss'],
})
export class CheckoutPaymentComponent implements AfterViewInit, OnDestroy {
  @Input() checkoutForm: FormGroup;
  @ViewChild('cardNumber', { static: true }) cardNumberElement: ElementRef;
  @ViewChild('cardExpiry', { static: true }) cardExpiryElement: ElementRef;
  @ViewChild('cardCvc', { static: true }) cardCvcElement: ElementRef;

  stripe: any;
  cardNumer: any;
  cardExpiry: any;
  cardCvc: any;
  cardErrors: any;
  cardHandler = this.onChange.bind(this);
  loading = false;
  cardNumberValid = false;
  cardExpiryValid = false;
  cardCvcValid = false;

  constructor(
    private basketService: BasketService,
    private checkoutService: CheckoutService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnDestroy(): void {
    this.cardNumer.destroy();
    this.cardExpiry.destroy();
    this.cardCvc.destroy();
  }

  onChange(event) {
    this.cardErrors = event.error ? event.error.message : null;

    switch(event.elementType) {
      case 'cardNumber':
        this.cardNumberValid = event.complete;
        break;
      case 'cardExpiry':
        this.cardExpiryValid = event.complete;
        break;
      case 'cardCvc':
        this.cardCvcValid = event.complete;
        break;
    }
  }

  ngAfterViewInit(): void {
    this.stripe = Stripe(
      'pk_test_51L7GLBJzN45eOcHhSpoMyVsOj3paUhVZv0YaiYCLQvnqL5lzgAjfX6DSPgFfWsLjUWRJF8799oBJHlNhtC2mfpAY00KiKetYNk'
    );
    const elements = this.stripe.elements();

    this.cardNumer = elements.create('cardNumber');
    this.cardNumer.mount(this.cardNumberElement.nativeElement);
    this.cardNumer.addEventListener('change', this.cardHandler);

    this.cardExpiry = elements.create('cardExpiry');
    this.cardExpiry.mount(this.cardExpiryElement.nativeElement);
    this.cardExpiry.addEventListener('change', this.cardHandler);

    this.cardCvc = elements.create('cardCvc');
    this.cardCvc.mount(this.cardCvcElement.nativeElement);
    this.cardCvc.addEventListener('change', this.cardHandler);
  }

  async submitOrder() {
    this.loading = true;
    const basket = this.basketService.getCurrentBasketValue();
    try {
      const createdOrder = await this.createOrder(basket);
      const paymentResult = await this.confirmPaymentWithStripe(basket);

      if (paymentResult.paymentIntent) {
        this.basketService.deleteLocalBasket(basket.id);
        const navigationExtras: NavigationExtras = { state: createdOrder };
        this.router.navigate(['checkout/success'], navigationExtras);
      } else {
        this.toastr.error(paymentResult.error.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      this.loading = false;
    }
  }
  private async confirmPaymentWithStripe(basket: IBasket) {
    return this.stripe.confirmCardPayment(basket.clientSecret, {
      payment_method: {
        card: this.cardNumer,
        billing_details: {
          name: this.checkoutForm.get('paymentForm').get('nameOnCard').value,
        },
      },
    });
  }

  private async createOrder(basket: IBasket) {
    const orderTocreate = this.getOrderToCreate(basket);
    return lastValueFrom(this.checkoutService.createOrder(orderTocreate));
  }

  private getOrderToCreate(basket: IBasket): IOrderToCreate {
    return {
      basketId: basket.id,
      deliveryMethodId: +this.checkoutForm
        .get('deliveryForm')
        .get('deliveryMethod').value,
      shipToAddress: this.checkoutForm.get('addressForm').value,
    };
  }
}
