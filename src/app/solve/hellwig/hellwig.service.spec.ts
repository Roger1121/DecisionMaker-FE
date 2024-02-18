import { TestBed } from '@angular/core/testing';

import { HellwigService } from './hellwig.service';

describe('HellwigService', () => {
  let service: HellwigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HellwigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
