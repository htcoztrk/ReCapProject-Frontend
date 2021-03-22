import { TestBed } from '@angular/core/testing';

import { CarDetailWithImageService } from './car-detail-with-image.service';

describe('CarDetailWithImageService', () => {
  let service: CarDetailWithImageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarDetailWithImageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
