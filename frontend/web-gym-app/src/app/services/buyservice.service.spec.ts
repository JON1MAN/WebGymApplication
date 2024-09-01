import { TestBed } from '@angular/core/testing';

import { BuyserviceService } from './buyservice.service';

describe('BuyserviceService', () => {
  let service: BuyserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BuyserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
