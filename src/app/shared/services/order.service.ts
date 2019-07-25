import { ShoppingCartService } from './shopping-cart.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable()
export class OrderService {

  constructor(private db: AngularFireDatabase, private shoppingCartService: ShoppingCartService) { }

  async placeOrder(order) {
    let result = await this.db.list('/orders').push(order);
    this.shoppingCartService.clearCart();
    return result;
  }

  getOrders() {
    return this.db.list('/orders').snapshotChanges().pipe(
      map(actions => actions.map(a => ({ $key: a.key, ...a.payload.val() }))
      ));
  }

  getOrdersByUser(userId: string) {
    return this.db.list('/orders', ref => {
      let q = ref.orderByChild('userId').equalTo(userId);
      return q;
    }).valueChanges();
  }

  cancleOrder(o) {
    return this.db.object('/orders/' + o.$key).remove();
  }
}
