import { TestBed } from '@angular/core/testing';

import { CategoriasServicesService } from './categorias-services.service';

describe('CategoriasServicesService', () => {
  let service: CategoriasServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoriasServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
