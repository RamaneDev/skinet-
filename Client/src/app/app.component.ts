
import { Component, OnInit } from '@angular/core';
import { BasketService } from './basket/basket.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})



export class AppComponent implements OnInit {


  constructor(private basketservice: BasketService) {}

  ngOnInit(): void {
    const basketId = localStorage.getItem('basket_id');
    this.basketservice.getBasket(basketId).subscribe({
      next: response => console.log(response)
    }
    )

    
  }
}




