import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateProductItemComponent } from './update-product-item.component';

describe('UpdateProductItemComponent', () => {
  let component: UpdateProductItemComponent;
  let fixture: ComponentFixture<UpdateProductItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateProductItemComponent]
    });
    fixture = TestBed.createComponent(UpdateProductItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
