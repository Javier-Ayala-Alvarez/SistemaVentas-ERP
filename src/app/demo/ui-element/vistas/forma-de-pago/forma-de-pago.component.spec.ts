import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormaDePagoComponent } from './forma-de-pago.component';

describe('FormaDePagoComponent', () => {
  let component: FormaDePagoComponent;
  let fixture: ComponentFixture<FormaDePagoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormaDePagoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormaDePagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
