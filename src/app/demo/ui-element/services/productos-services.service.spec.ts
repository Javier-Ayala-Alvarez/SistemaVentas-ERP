import { TestBed } from '@angular/core/testing';

import { ProductosServicesService } from './productos-services.service';

describe('ProductosServicesService', () => {
  let service: ProductosServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductosServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
