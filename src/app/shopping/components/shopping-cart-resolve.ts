import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart.service';

@Injectable({
    providedIn: 'root',
})
export class ShoppingCartResolve implements Resolve<any> {
    constructor(private shoppingCartService: ShoppingCartService) { }

    async resolve(){
      return await this.shoppingCartService.getCart();
    }
}