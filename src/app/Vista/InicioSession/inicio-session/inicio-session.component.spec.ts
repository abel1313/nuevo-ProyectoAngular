import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InicioSessionComponent } from './inicio-session.component';

describe('InicioSessionComponent', () => {
  let component: InicioSessionComponent;
  let fixture: ComponentFixture<InicioSessionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InicioSessionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InicioSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
