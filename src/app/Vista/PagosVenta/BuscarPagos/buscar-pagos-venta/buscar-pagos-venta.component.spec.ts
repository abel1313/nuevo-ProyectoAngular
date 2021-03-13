import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarPagosVentaComponent } from './buscar-pagos-venta.component';

describe('BuscarPagosVentaComponent', () => {
  let component: BuscarPagosVentaComponent;
  let fixture: ComponentFixture<BuscarPagosVentaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuscarPagosVentaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscarPagosVentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
