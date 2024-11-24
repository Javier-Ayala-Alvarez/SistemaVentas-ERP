import { TestBed } from '@angular/core/testing';

import { MensajesSwal2Service } from './mensajes-swal2.service';

describe('MensajesSwal2Service', () => {
  let service: MensajesSwal2Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MensajesSwal2Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
