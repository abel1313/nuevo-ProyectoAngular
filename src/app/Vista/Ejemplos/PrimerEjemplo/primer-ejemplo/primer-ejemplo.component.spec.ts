import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimerEjemploComponent } from './primer-ejemplo.component';

describe('PrimerEjemploComponent', () => {
  let component: PrimerEjemploComponent;
  let fixture: ComponentFixture<PrimerEjemploComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrimerEjemploComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrimerEjemploComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
