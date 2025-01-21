import { TestBed } from '@angular/core/testing';

import { RemesasServicesService } from '../services/remesas-services.service';

describe('RemesasServicesService', () => {
  let service: RemesasServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RemesasServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
