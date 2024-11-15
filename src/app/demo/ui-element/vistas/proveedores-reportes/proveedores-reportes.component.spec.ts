import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProveedoresReportesComponent } from './proveedores-reportes.component';

describe('ProveedoresReportesComponent', () => {
  let component: ProveedoresReportesComponent;
  let fixture: ComponentFixture<ProveedoresReportesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProveedoresReportesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProveedoresReportesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
