import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import {
  ActivatedRoute,
  Router,
  RouterEvent,
  RouterModule,
} from '@angular/router';
import { IProduct } from '../../models/iproduct';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent implements OnInit {
  product!: IProduct;

  constructor(
    private productsService: ProductsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit(): void {
    //? get the id from params
    const productId = Number(this.route.snapshot.paramMap.get('id'));
    this.product = this.productsService.getProductById(productId)!;
  }

  goBackToProducts() {
    this.router.navigate(['/products']);
  }
}
