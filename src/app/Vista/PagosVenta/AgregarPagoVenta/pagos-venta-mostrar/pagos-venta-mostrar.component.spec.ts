import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagosVentaMostrarComponent } from './pagos-venta-mostrar.component';

describe('PagosVentaMostrarComponent', () => {
  let component: PagosVentaMostrarComponent;
  let fixture: ComponentFixture<PagosVentaMostrarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagosVentaMostrarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PagosVentaMostrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
