import { TestBed, async, inject } from '@angular/core/testing';

import { StopIfAuthenticatedGuard } from './stop-if-authenticated.guard';

describe('StopIfAuthenticatedGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StopIfAuthenticatedGuard]
    });
  });

  it('should ...', inject([StopIfAuthenticatedGuard], (guard: StopIfAuthenticatedGuard) => {
    expect(guard).toBeTruthy();
  }));
});
