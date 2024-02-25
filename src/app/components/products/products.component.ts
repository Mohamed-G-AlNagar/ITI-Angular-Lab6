import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  input,
} from '@angular/core';
import { IProduct } from '../../models/iproduct';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BorderRoundAndShadowDirective } from '../../directives/border-round-and-shadow.directive';
import { CreaditCardFormatPipe } from '../../pipes/creadit-card-format.pipe';
import { RouterModule } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    BorderRoundAndShadowDirective,
    CreaditCardFormatPipe,
    RouterModule,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit {
  ClientName: string = 'Mohamed';
  products: IProduct[] = [];
  productsFiltered: IProduct[] = [];
  creaditCard: string = '0000000000000000000';
  appBorderRound: string = '';
  showImages: boolean = true;

  constructor(
    private productsService: ProductsService,
    private cartService: CartService
  ) {}

  // ? get the products on page init
  ngOnInit(): void {
    //? on initialization
    this.products = this.productsService.getAllProducts();
    this.productsFiltered = this.products;
  }

  addCartItem(item: IProduct) {
    const id: number = item.id;
    this.productsFiltered.forEach((item) => {
      if (item.id === id) {
        item.quantity--;
      }
    });
    this.cartService.addCartItem(item);
  }

  set filterValue(value: string) {
    this.productsFiltered = this.listFilterdValue(value);
  }
  set filterGategory(value: number) {
    this.productsFiltered = this.ListFilterdCategory(value);
  }
  //---------------------------------------------------
  //? get the value from outside (parent) and pass it to function to set it the filtered items
  @Input() set filterByPriceOrNameValue(value: number | string) {
    const parsedValue = parseFloat(value.toString()); // Ensure value is converted  to number to check

    if (!isNaN(parsedValue)) {
      // check if after convert its number
      this.productsFiltered = this.ListFilterdPrice(parsedValue);
    } else {
      // if not anumber NaN than its string
      this.productsFiltered = this.listFilterdValue(value.toString());
    }
  }

  ListFilterdPrice(value: number) {
    if (!value) value = 0;
    return this.products.filter((item) => item.price >= value);
  }
  listFilterdValue(value: string) {
    return this.products.filter((item) =>
      item.name.toLocaleLowerCase().includes(value.toLocaleLowerCase())
    );
  }
  //---------------------------------------------
  toggleImages() {
    this.showImages = !this.showImages;
    console.log(this.showImages);
  }

  ListFilterdCategory(value: number) {
    return this.products.filter((item) => item.categoryID == value);
  }

  //? Emitting decorator Event named here addchildEvent (need to called with the data to emitt)
  // @Output() addchildEvent: EventEmitter<IProduct> =
  //   new EventEmitter<IProduct>();

  // addToCard(prod: IProduct) {
  //   const id: number = prod.id;
  //   this.productsFiltered.forEach((item) => {
  //     if (item.id === id) {
  //       item.quantity--;
  //     }
  //   });
  //   //? call here to emit this data
  //   this.addchildEvent.emit(prod);
  // }
}
