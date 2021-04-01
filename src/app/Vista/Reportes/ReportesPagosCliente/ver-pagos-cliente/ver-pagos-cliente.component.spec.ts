import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerPagosClienteComponent } from './ver-pagos-cliente.component';

describe('VerPagosClienteComponent', () => {
  let component: VerPagosClienteComponent;
  let fixture: ComponentFixture<VerPagosClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerPagosClienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerPagosClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
