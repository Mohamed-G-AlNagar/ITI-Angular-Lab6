import { Component } from '@angular/core';
import { ProductsCRUDComponent } from '../products-crud/products-crud.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [ProductsCRUDComponent, RouterOutlet],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export class AdminComponent {}
