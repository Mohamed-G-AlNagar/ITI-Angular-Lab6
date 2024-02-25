import { Component, OnInit } from '@angular/core';
import { ProductsAPIService } from '../../services/productsAPI.service';
import { IProductAPI } from '../../models/iproduct-api';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products-crud',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './products-crud.component.html',
  styleUrl: './products-crud.component.scss',
})
export class ProductsCRUDComponent implements OnInit {
  products: IProductAPI[] = [];
  product: IProductAPI = {} as IProductAPI; //? as part of the Iproduct array
  updatingProduct: boolean = false;
  categories: string[] = [];
  constructor(
    private productsAPIService: ProductsAPIService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts() {
    this.productsAPIService.getAllProducts().subscribe({
      next: (data) => {
        console.log(data);
        this.products = data;
        this.categories = this.getCategories(data);
      },
    });
    this.goBackToAdminProductsCRUD();
  }

  getCategories(products: IProductAPI[]): string[] {
    const categoriesSet = new Set<string>(
      products.map((product) => product.category)
    );
    return Array.from(categoriesSet);
  }

  addProduct() {
    console.log(this.product, 'product');
    this.productsAPIService.addProduct(this.product).subscribe({
      next: (data) => {
        console.log(data);
        this.product = {} as IProductAPI;
        this.getAllProducts();
      },
    });
    console.log(this.products, 'products');
  }
  deleteProduct(prodId: number) {
    const confirmed = confirm('Are you sure you want to delete this product?');
    console.log(confirmed, 'confirm');
    if (!confirmed) return;
    this.productsAPIService.deleteProduct(prodId).subscribe({
      next: (data) => {
        console.log(data);
        this.getAllProducts();
      },
    });
    console.log(this.products, 'products');
  }
  updateProduct() {
    this.updatingProduct = false;
    this.productsAPIService.updateProduct(this.product).subscribe({
      next: (data) => {
        console.log(data);
        this.product = {} as IProductAPI;
        this.getAllProducts();
      },
    });

    console.log(this.products, 'products');
  }

  editProduct(prodId: number) {
    this.productsAPIService.editProduct(prodId).subscribe({
      next: (data) => {
        console.log(data);
        this.product = data;
      },
    });
    this.updatingProduct = true;
  }

  goBackToAdminProductsCRUD() {
    this.router.navigate(['/admin/productsCRUD']);
  }
}
