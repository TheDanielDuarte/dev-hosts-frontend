import { TestBed, async, inject } from '@angular/core/testing';

import { ServersResolver } from './servers.resolver';

describe('ServersResolver', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ServersResolver]
    });
  });

  it('should ...', inject([ServersResolver], (guard: ServersResolver) => {
    expect(guard).toBeTruthy();
  }));
});
