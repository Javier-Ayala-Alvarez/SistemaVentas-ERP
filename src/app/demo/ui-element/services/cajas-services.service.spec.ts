import { TestBed } from '@angular/core/testing';

import { CajasServicesService } from '../services/cajas-services.service';

describe('CajasServicesService', () => {
  let service: CajasServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CajasServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
