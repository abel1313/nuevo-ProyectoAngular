import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FechasVentaComponent } from './fechas-venta.component';

describe('FechasVentaComponent', () => {
  let component: FechasVentaComponent;
  let fixture: ComponentFixture<FechasVentaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FechasVentaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FechasVentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
