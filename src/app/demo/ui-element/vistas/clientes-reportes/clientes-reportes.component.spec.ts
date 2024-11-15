import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientesReportesComponent } from './clientes-reportes.component';

describe('ClientesReportesComponent', () => {
  let component: ClientesReportesComponent;
  let fixture: ComponentFixture<ClientesReportesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientesReportesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientesReportesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
