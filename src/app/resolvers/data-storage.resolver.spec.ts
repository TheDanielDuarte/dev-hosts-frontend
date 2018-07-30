import { TestBed, async, inject } from '@angular/core/testing';

import { DataStorageResolver } from './data-storage.resolver';

describe('DataStorageResolver', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataStorageResolver]
    });
  });

  it('should ...', inject([DataStorageResolver], (guard: DataStorageResolver) => {
    expect(guard).toBeTruthy();
  }));
});
