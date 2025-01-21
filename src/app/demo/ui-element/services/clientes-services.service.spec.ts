import { TestBed } from '@angular/core/testing';

import { ClientesServicesService } from './clientes-services.service';

describe('ClientesServicesService', () => {
  let service: ClientesServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientesServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
