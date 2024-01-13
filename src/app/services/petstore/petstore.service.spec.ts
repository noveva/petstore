import { TestBed } from '@angular/core/testing';

import { PetstoreService } from './petstore.service';

describe('PetstoreService', () => {
  let service: PetstoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PetstoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
