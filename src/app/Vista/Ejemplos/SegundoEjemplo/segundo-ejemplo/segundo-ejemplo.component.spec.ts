import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SegundoEjemploComponent } from './segundo-ejemplo.component';

describe('SegundoEjemploComponent', () => {
  let component: SegundoEjemploComponent;
  let fixture: ComponentFixture<SegundoEjemploComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SegundoEjemploComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SegundoEjemploComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
