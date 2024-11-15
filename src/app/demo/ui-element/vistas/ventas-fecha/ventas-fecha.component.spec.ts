import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentasFechaComponent } from './ventas-fecha.component';

describe('VentasFechaComponent', () => {
  let component: VentasFechaComponent;
  let fixture: ComponentFixture<VentasFechaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VentasFechaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VentasFechaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
