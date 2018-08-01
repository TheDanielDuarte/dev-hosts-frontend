import { TestBed, async, inject } from '@angular/core/testing';

import { ServiceResolver } from './service.resolver';

describe('ServiceResolver', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ServiceResolver]
    });
  });

  it('should ...', inject([ServiceResolver], (guard: ServiceResolver) => {
    expect(guard).toBeTruthy();
  }));
});
