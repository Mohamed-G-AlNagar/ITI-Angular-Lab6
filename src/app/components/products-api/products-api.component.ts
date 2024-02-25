import { Component, OnInit } from '@angular/core';
import { ProductsAPIService } from '../../services/productsAPI.service';
import { IProductAPI } from '../../models/iproduct-api';
import { CommonModule } from '@angular/common';
import { BorderRoundAndShadowDirective } from '../../directives/border-round-and-shadow.directive';

@Component({
  selector: 'app-products-api',
  standalone: true,
  imports: [CommonModule, BorderRoundAndShadowDirective],
  templateUrl: './products-api.component.html',
  styleUrl: './products-api.component.scss',
})
export class ProductsAPIComponent implements OnInit {
  products: IProductAPI[] = [];
  isLoading: boolean = false;
  constructor(private productsAPIService: ProductsAPIService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.productsAPIService.getAllProducts().subscribe({
      next: (data) => {
        console.log(data);
        this.products = data;
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }
}
