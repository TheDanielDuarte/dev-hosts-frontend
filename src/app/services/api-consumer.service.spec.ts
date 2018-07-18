import { TestBed, inject } from '@angular/core/testing';

import { ApiConsumerService } from './api-consumer.service';

describe('ApiConsumerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiConsumerService]
    });
  });

  it('should be created', inject([ApiConsumerService], (service: ApiConsumerService) => {
    expect(service).toBeTruthy();
  }));
});
