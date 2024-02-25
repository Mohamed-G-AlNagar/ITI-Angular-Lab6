import { Component } from '@angular/core';
import { ProductsComponent } from '../products/products.component';
import { FormsModule } from '@angular/forms';
import { IProduct } from '../../models/iproduct';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products-parent',
  standalone: true,
  imports: [FormsModule, ProductsComponent, CommonModule],
  templateUrl: './products-parent.component.html',
  styleUrl: './products-parent.component.scss',
})
export class ProductsParentComponent {
  filterValue!: string | number; //? to get the filter value from the input and then append to the child (pass it) to serch by it there
}
