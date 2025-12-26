import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarEnviosComponent } from './agregar-envios.component';

describe('AgregarEnviosComponent', () => {
  let component: AgregarEnviosComponent;
  let fixture: ComponentFixture<AgregarEnviosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgregarEnviosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarEnviosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
