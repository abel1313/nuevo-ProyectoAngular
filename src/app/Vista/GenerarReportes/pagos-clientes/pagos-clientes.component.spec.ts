import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagosClientesComponent } from './pagos-clientes.component';

describe('PagosClientesComponent', () => {
  let component: PagosClientesComponent;
  let fixture: ComponentFixture<PagosClientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagosClientesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PagosClientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
