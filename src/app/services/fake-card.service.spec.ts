import { TestBed } from '@angular/core/testing';

import { FakeCardService } from './fake-card.service';

describe('FakeCardService', () => {
  let service: FakeCardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FakeCardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
