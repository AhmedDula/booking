import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RaiseDispute } from './raise-dispute';

describe('RaiseDispute', () => {
  let component: RaiseDispute;
  let fixture: ComponentFixture<RaiseDispute>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RaiseDispute],
    }).compileComponents();

    fixture = TestBed.createComponent(RaiseDispute);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
