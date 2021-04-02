import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarMarcasComponent } from './agregar-marcas.component';

describe('AgregarMarcasComponent', () => {
  let component: AgregarMarcasComponent;
  let fixture: ComponentFixture<AgregarMarcasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarMarcasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarMarcasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
