import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VariationOptionComponent } from './variationOption.component';

describe('VariationOptionComponent', () => {
  let component: VariationOptionComponent;
  let fixture: ComponentFixture<VariationOptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VariationOptionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VariationOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
