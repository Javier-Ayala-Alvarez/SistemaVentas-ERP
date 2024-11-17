import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarUnidadMedidaComponent } from './buscar-unidad-medida.component';

describe('BuscarUnidadMedidaComponent', () => {
  let component: BuscarUnidadMedidaComponent;
  let fixture: ComponentFixture<BuscarUnidadMedidaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuscarUnidadMedidaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuscarUnidadMedidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
