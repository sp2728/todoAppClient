import { TestBed } from '@angular/core/testing';

import { CompleteService } from './complete.service';

describe('CompleteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CompleteService = TestBed.get(CompleteService);
    expect(service).toBeTruthy();
  });
});
