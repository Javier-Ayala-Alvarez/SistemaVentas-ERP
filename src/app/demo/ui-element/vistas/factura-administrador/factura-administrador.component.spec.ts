import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacturaAdministradorComponent } from './factura-administrador.component';

describe('FacturaAdministradorComponent', () => {
  let component: FacturaAdministradorComponent;
  let fixture: ComponentFixture<FacturaAdministradorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FacturaAdministradorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacturaAdministradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
