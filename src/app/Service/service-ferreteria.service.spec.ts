import { TestBed } from '@angular/core/testing';

import { ServiceFerreteriaService } from './service-ferreteria.service';

describe('ServiceFerreteriaService', () => {
  let service: ServiceFerreteriaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceFerreteriaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
