import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisputeCard } from './dispute-card';

describe('DisputeCard', () => {
  let component: DisputeCard;
  let fixture: ComponentFixture<DisputeCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisputeCard],
    }).compileComponents();

    fixture = TestBed.createComponent(DisputeCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
