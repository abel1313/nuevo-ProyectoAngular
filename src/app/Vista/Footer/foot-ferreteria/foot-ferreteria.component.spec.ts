import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FootFerreteriaComponent } from './foot-ferreteria.component';

describe('FootFerreteriaComponent', () => {
  let component: FootFerreteriaComponent;
  let fixture: ComponentFixture<FootFerreteriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FootFerreteriaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FootFerreteriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
