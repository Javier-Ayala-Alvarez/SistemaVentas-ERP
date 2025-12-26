import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarRecepcionComponent } from './agregar-recepcion.component';

describe('AgregarRecepcionComponent', () => {
  let component: AgregarRecepcionComponent;
  let fixture: ComponentFixture<AgregarRecepcionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgregarRecepcionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarRecepcionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
