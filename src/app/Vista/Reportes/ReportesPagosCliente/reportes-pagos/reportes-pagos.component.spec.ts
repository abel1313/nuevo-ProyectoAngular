import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportesPagosComponent } from './reportes-pagos.component';

describe('ReportesPagosComponent', () => {
  let component: ReportesPagosComponent;
  let fixture: ComponentFixture<ReportesPagosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportesPagosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportesPagosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
