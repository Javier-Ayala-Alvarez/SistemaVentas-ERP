import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarRemesaComponent } from './agregar-remesa.component';

describe('AgregarRemesaComponent', () => {
  let component: AgregarRemesaComponent;
  let fixture: ComponentFixture<AgregarRemesaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgregarRemesaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarRemesaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
