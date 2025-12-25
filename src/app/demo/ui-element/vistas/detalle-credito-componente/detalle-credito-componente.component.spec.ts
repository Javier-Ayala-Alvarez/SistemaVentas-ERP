import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleCreditoComponenteComponent } from './detalle-credito-componente.component';

describe('DetalleCreditoComponenteComponent', () => {
  let component: DetalleCreditoComponenteComponent;
  let fixture: ComponentFixture<DetalleCreditoComponenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalleCreditoComponenteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalleCreditoComponenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
