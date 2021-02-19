import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavFerreteriaComponent } from './nav-ferreteria.component';

describe('NavFerreteriaComponent', () => {
  let component: NavFerreteriaComponent;
  let fixture: ComponentFixture<NavFerreteriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavFerreteriaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavFerreteriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
