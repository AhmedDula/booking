import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatesStep } from './dates-guests-step';

describe('DatesStep', () => {
  let component: DatesStep;
  let fixture: ComponentFixture<DatesStep>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatesStep],
    }).compileComponents();

    fixture = TestBed.createComponent(DatesStep);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
