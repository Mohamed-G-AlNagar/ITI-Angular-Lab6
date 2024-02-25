import { Injectable } from '@angular/core';
import { IProduct } from '../models/iproduct';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private products: IProduct[] = [
    {
      id: 1,
      name: 'Fjallraven Backpack',
      price: 109.95,
      img: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
      categoryID: 1,
      quantity: 3,
    },
    {
      id: 2,
      name: 'Slim Fit T-Shirts',
      price: 22.3,
      img: 'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg',
      categoryID: 1,
      quantity: 0,
    },
    {
      id: 3,
      name: 'Cotton Jacket for Men',
      price: 55.99,
      img: 'https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg',
      categoryID: 1,
      quantity: 8,
    },
    {
      id: 4,
      name: 'Casual Slim Fit Shirt',
      price: 15.99,
      img: 'https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg',
      categoryID: 1,
      quantity: 0,
    },
    {
      id: 5,
      name: 'Dragon Station Chain Bracelet',
      price: 695,
      img: 'https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg',
      categoryID: 2,
      quantity: 5,
    },
    {
      id: 6,
      name: 'Gold Petite Micropave Necklace',
      price: 168,
      img: 'https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_.jpg',
      categoryID: 2,
      quantity: 0,
    },
    {
      id: 7,
      name: 'Princess Diamond Promise Ring',
      price: 9.99,
      img: 'https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg',
      categoryID: 2,
      quantity: 0,
    },
    {
      id: 8,
      name: 'Rose Gold Plated Double Flared Earrings',
      price: 10.99,
      img: 'https://fakestoreapi.com/img/51UDEzMJVpL._AC_UL640_QL65_ML3_.jpg',
      categoryID: 2,
      quantity: 1,
    },
  ];
  constructor() {}

  getAllProducts(): IProduct[] {
    return this.products;
  }
  getProductById(productId: number): IProduct | undefined {
    return this.products.find((product) => product.id == productId);
  }
  getProductsByCatID(catID: number): IProduct[] {
    return this.products.filter((product) => product.categoryID === catID);
  }
}
