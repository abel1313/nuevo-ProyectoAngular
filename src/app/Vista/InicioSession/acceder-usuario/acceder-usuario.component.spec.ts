import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccederUsuarioComponent } from './acceder-usuario.component';

describe('AccederUsuarioComponent', () => {
  let component: AccederUsuarioComponent;
  let fixture: ComponentFixture<AccederUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccederUsuarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccederUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
