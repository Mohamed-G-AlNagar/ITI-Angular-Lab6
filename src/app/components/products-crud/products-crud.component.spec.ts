import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsCRUDComponent } from './products-crud.component';

describe('ProductsCRUDComponent', () => {
  let component: ProductsCRUDComponent;
  let fixture: ComponentFixture<ProductsCRUDComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsCRUDComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductsCRUDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
