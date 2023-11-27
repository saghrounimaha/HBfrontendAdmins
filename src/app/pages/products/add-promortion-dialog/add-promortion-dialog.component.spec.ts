import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPromortionDialogComponent } from './add-promortion-dialog.component';

describe('AddPromortionDialogComponent', () => {
  let component: AddPromortionDialogComponent;
  let fixture: ComponentFixture<AddPromortionDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddPromortionDialogComponent]
    });
    fixture = TestBed.createComponent(AddPromortionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
