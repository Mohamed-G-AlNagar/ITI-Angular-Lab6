import { Component, OnChanges, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { IProduct } from '../../models/iproduct';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
// export class CartComponent implements OnInit, OnChanges {
export class CartComponent implements OnInit {
  cart: IProduct[] = [];
  cartTotalPrice: number = 0;
  currentPurchaseDate: Date = new Date();
  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cart = this.cartService.getCartAllItems();
    this.getCartTotalPrice();
    this.getCurrentPurchaseDate();
  }

  // ngOnChanges(): void {
  //   console.log('change', '---');
  //   this.cart;
  //   this.getCartTotalPrice(); // ? update the total price
  // }

  getCartAllItems() {
    this.cart = this.cartService.getCartAllItems();
    this.getCartTotalPrice();
  }

  deleteCartItem(id: number) {
    this.cartService.deleteCartItem(id);
    this.getCartTotalPrice();
  }

  getCurrentPurchaseDate() {
    this.currentPurchaseDate = this.cartService.getLastPurchaseDate();
  }

  increaseQty(itemId: number) {
    this.cartService.increaseItemQty(itemId);
    this.getCartTotalPrice();
  }
  decreaseQty(itemId: number) {
    this.cartService.decreaseItemQty(itemId);
    this.getCartTotalPrice();
  }

  getCartTotalPrice() {
    this.cartTotalPrice = this.cartService.getTotalPrice();
  }
}
