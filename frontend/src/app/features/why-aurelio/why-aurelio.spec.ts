import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhyAurelio } from './why-aurelio';

describe('WhyAurelio', () => {
  let component: WhyAurelio;
  let fixture: ComponentFixture<WhyAurelio>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WhyAurelio],
    }).compileComponents();

    fixture = TestBed.createComponent(WhyAurelio);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
