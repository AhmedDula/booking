import { TestBed } from '@angular/core/testing';

import { Dispute } from './dispute';

describe('Dispute', () => {
  let service: Dispute;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Dispute);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
