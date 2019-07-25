import { ShoppingCart } from '../../models/shopping-cart';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { Product } from '../../models/product';
import { Component, OnInit, Input } from '@angular/core';
import { trigger, state, transition, animate, style } from '@angular/animations';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
  // animations: [
  //   trigger('fade', [
  //     transition('void => *', [
  //       style({ opacity: 0 }),
  //       animate(2000)
  //     ])
  //   ])
  // ]
})
export class ProductCardComponent {
  @Input('product') product: Product;
  @Input('show-actions') showActions = true;
  @Input('shopping-cart') shoppingCart: ShoppingCart; 

  constructor(private cartService: ShoppingCartService) { }

  addToCart() {
    this.cartService.addToCart(this.product);
  }
}
