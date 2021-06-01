import { TestBed } from '@angular/core/testing';

import { AdsPackageService } from './ads-package.service';

describe('AdsPackageService', () => {
  let service: AdsPackageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdsPackageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
