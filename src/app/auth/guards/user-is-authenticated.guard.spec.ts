import { TestBed, async, inject } from '@angular/core/testing';

import { UserIsAuthenticatedGuard } from './user-is-authenticated.guard';

describe('UserIsAuthenticatedGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserIsAuthenticatedGuard]
    });
  });

  it('should ...', inject([UserIsAuthenticatedGuard], (guard: UserIsAuthenticatedGuard) => {
    expect(guard).toBeTruthy();
  }));
});
