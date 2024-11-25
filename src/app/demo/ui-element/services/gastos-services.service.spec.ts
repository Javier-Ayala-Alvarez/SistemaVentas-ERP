import { TestBed } from '@angular/core/testing';

import { GastosServicesService } from '../services/gastos-services.service';

describe('GastosServicesService', () => {
  let service: GastosServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GastosServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
