import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerarReportesVentasComponent } from './generar-reportes-ventas.component';

describe('GenerarReportesVentasComponent', () => {
  let component: GenerarReportesVentasComponent;
  let fixture: ComponentFixture<GenerarReportesVentasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenerarReportesVentasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerarReportesVentasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
