import { Injectable } from '@angular/core';
import { IProduct } from '../models/iproduct';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cart: IProduct[] = [];
  cartTotalPrice: number = 0;
  currentDate: Date = new Date();
  constructor() {}

  addCartItem(recivedItem: IProduct) {
    let itemInCart = this.cart.find((item) => item.id === recivedItem.id);
    if (itemInCart) {
      //? because the quantityInCart initialy need to be zer instead of undifined
      itemInCart.quantityInCart = (itemInCart.quantityInCart || 0) + 1;
    } else {
      itemInCart = { ...recivedItem, quantityInCart: 1 };
      this.cart.push(itemInCart);
      if (this.cart.length === 1) {
        this.currentDate = new Date(); //? Update currentDate when the first item is added
      }
    }

    this.cartTotalPrice = this.cart.reduce(
      (acc, curr) => acc + curr.price * (curr.quantityInCart || 0),
      0
    );
  }

  getLastPurchaseDate() {
    return this.currentDate;
  }

  getCartAllItems() {
    return this.cart;
  }
  getTotalPrice() {
    return this.cartTotalPrice;
  }
  deleteCartItem(id: number) {
    this.cart = this.cart.filter((item) => item.id !== id);
    this.cartTotalPrice = this.cart.reduce(
      (acc, curr) => acc + curr.price * (curr.quantityInCart || 0),
      0
    );
  }

  increaseItemQty(itemId: number) {
    let item = this.cart.find((item) => item.id === itemId);
    if (item) {
      item.quantityInCart = (item.quantityInCart || 0) + 1;
      this.cartTotalPrice += item.price;
    }
  }

  decreaseItemQty(itemId: number) {
    let item = this.cart.find((item) => item.id === itemId);
    if (item) {
      item.quantityInCart = (item.quantityInCart || 0) - 1;
      this.cartTotalPrice -= item.price;
    }
  }
}
