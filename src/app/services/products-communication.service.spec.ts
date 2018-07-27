import { TestBed, inject } from '@angular/core/testing';

import { ProductsCommunicationService } from './products-communication.service';

describe('ProductsCommunicationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductsCommunicationService]
    });
  });

  it('should be created', inject([ProductsCommunicationService], (service: ProductsCommunicationService) => {
    expect(service).toBeTruthy();
  }));
});
