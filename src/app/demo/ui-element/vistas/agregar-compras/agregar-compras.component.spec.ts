import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarComprasComponent } from './agregar-compras.component';

describe('AgregarComprasComponent', () => {
  let component: AgregarComprasComponent;
  let fixture: ComponentFixture<AgregarComprasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgregarComprasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarComprasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
