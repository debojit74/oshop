import { ActivatedRoute } from '@angular/router';
import { fadeInanimation, bounceInTopAnimation } from './../../animations/animations';
import { ShoppingCartService } from '../../../shared/services/shopping-cart.service';
import { Component, OnInit } from '@angular/core';
import { trigger, transition, useAnimation, query, animateChild, group } from '@angular/animations';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
  animations: [ 
    trigger('shoppingCartAnimation', [
      transition(':enter', [
        group([
          query('h2', [
            useAnimation(bounceInTopAnimation, {
              params: {
                duration: '0.4s'
              }
            }),
          ]),
          query('@cartItemAnimation', animateChild(), { optional: true })
        ])
      ])
    ]),

    trigger('cartItemAnimation', [
      transition(':enter', [
        useAnimation(fadeInanimation, {
          params: {
            duration:'1s'
          }
        })
      ])
    ])
  ]
})
export class ShoppingCartComponent implements OnInit {
  cart$;
  isLoading : boolean;

  constructor(private shoppingCartService: ShoppingCartService) { }

  async ngOnInit() {
    this.isLoading = true;
    this.cart$ = await this.shoppingCartService.getCart();
  }

  clearCart() {
    this.shoppingCartService.clearCart();
  }

  // (@fade.start)="animationStarted($event)" (@fade.done)="animationDone($event)" <template>
  // animationStarted($event){
  //   // console.log($event);
  // }
  // animationDone($event){
  //   // console.log($event);
  // }
}
