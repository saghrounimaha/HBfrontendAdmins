import { TestBed } from '@angular/core/testing';
import { VariationOptionService } from './variation-option.service';


describe('VariationOptionService', () => {
  let service: VariationOptionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VariationOptionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
