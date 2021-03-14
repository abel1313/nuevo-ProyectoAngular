import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExampleUsuarioComponent } from './example-usuario.component';

describe('ExampleUsuarioComponent', () => {
  let component: ExampleUsuarioComponent;
  let fixture: ComponentFixture<ExampleUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExampleUsuarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExampleUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
