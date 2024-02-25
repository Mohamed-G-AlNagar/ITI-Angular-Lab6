import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IProductAPI } from '../models/iproduct-api';

@Injectable({
  providedIn: 'root',
})
export class ProductsAPIService {
  constructor(private http: HttpClient) {}

  //   getAllProducts(): Observable<any> {
  //     let products!: [];

  //     return this.http
  //       .get<any>('https://dummyjson.com/products')
  //       .pipe(map((data: any) => data.products)); //? return the products array only
  //   }

  // }
  getAllProducts(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:3000/products'); //? local json server
  }

  addProduct(product: IProductAPI): Observable<any[]> {
    return this.http.post<any[]>(
      'http://localhost:3000/products',
      JSON.stringify(product)
    );
  }

  updateProduct(product: IProductAPI): Observable<any[]> {
    return this.http.put<any[]>(
      `http://localhost:3000/products/${product.id}`,
      JSON.stringify(product)
    );
  }

  editProduct(prodId: number): Observable<any> {
    return this.http.get(`http://localhost:3000/products/${prodId}`);
  }
  deleteProduct(prodId: number): Observable<any> {
    return this.http.delete(`http://localhost:3000/products/${prodId}`);
  }
}
