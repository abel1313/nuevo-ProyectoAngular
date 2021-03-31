import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerarReportesPagosComponent } from './generar-reportes-pagos.component';

describe('GenerarReportesPagosComponent', () => {
  let component: GenerarReportesPagosComponent;
  let fixture: ComponentFixture<GenerarReportesPagosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenerarReportesPagosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerarReportesPagosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
