import { TestBed } from '@angular/core/testing';

import { TipoOperacionServicesService } from './tipo-operacion-services.service';

describe('TipoOperacionServicesService', () => {
  let service: TipoOperacionServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoOperacionServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
