import { TestBed } from '@angular/core/testing';

import { ProveedoresServicesService } from './proveedores-services.service';

describe('ProveedoresServicesService', () => {
  let service: ProveedoresServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProveedoresServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
