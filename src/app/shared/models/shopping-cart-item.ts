import { Product } from './product';

export class ShoppingCartItem {
  product: {
    title: string;
    imageUrl: string;
    price: number;
  }
  $key: string;
  quantity: number;

  constructor(init?: Partial<ShoppingCartItem>) {
    Object.assign(this, init);
  }

  get totalPrice() {
    return this.product.price * this.quantity;
  }
}