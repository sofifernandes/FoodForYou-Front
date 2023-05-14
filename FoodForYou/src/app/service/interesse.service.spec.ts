import { TestBed } from '@angular/core/testing';

import { InteresseService } from './interesse.service';

describe('TemaService', () => {
  let service: InteresseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InteresseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
