import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarMarcasComponent } from './buscar-marcas.component';

describe('BuscarMarcasComponent', () => {
  let component: BuscarMarcasComponent;
  let fixture: ComponentFixture<BuscarMarcasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuscarMarcasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscarMarcasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
