import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsAPIComponent } from './products-api.component';

describe('ProductsAPIComponent', () => {
  let component: ProductsAPIComponent;
  let fixture: ComponentFixture<ProductsAPIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsAPIComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductsAPIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
