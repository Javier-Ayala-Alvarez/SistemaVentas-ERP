import { TestBed } from '@angular/core/testing';

import { UnidadesServicesService } from './unidades-services.service';

describe('UnidadesServicesService', () => {
  let service: UnidadesServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UnidadesServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
