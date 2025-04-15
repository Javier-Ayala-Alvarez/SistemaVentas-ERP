import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarCotizacionComponent } from './agregar-cotizacion.component';

describe('AgregarCotizacionComponent', () => {
  let component: AgregarCotizacionComponent;
  let fixture: ComponentFixture<AgregarCotizacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgregarCotizacionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarCotizacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
