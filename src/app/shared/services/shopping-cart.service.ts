import { Observable } from 'rxjs';
import { ShoppingCart } from '../models/shopping-cart';
import { Product } from '../models/product';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { map, take } from 'rxjs/operators';

@Injectable()
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  async getCart(): Promise<Observable<ShoppingCart>> {
    let cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId).valueChanges().pipe(
      map((x: any) =>  new ShoppingCart(x.items)));
  }

  async addToCart(product: Product) {
    this.updateItem(product, 1);
  }

  async removeFromCart(product: Product) {
    this.updateItem(product, -1);
  }

  async clearCart() {
    let cartId = await this.getOrCreateCartId();
    this.db.object('/shopping-carts/' + cartId + '/items').remove();
  }

  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }

  private getItem(cartId: string, productId: string) {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }

  private async getOrCreateCartId(): Promise<string> {
    let cartId = localStorage.getItem('cartId');
    if (cartId) return cartId;

    let result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;
  }

  private async updateItem(product: Product, change: number) {
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(cartId, product.$key);
    item$.snapshotChanges().pipe(take(1)).subscribe(item => {
      if (item.payload.exists()) {
        let _quantity = (item.payload.exportVal().quantity || 0) + change;
        if (_quantity === 0) item$.remove();
        else{
          item$.update({
            quantity: _quantity
          });
        }
      } else {
        item$.update({
          product: {
            title: product.title,
            price: product.price,
            category: product.category,
            imageUrl: product.imageUrl,

          }, quantity: 1 
        });
      }
    });
  }
}
