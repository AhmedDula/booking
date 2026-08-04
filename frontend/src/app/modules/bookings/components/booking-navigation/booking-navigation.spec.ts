import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingNavigation } from './booking-navigation';

describe('BookingNavigation', () => {
  let component: BookingNavigation;
  let fixture: ComponentFixture<BookingNavigation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookingNavigation],
    }).compileComponents();

    fixture = TestBed.createComponent(BookingNavigation);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
