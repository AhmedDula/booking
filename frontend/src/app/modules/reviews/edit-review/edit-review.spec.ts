import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditReview } from './edit-review';

describe('EditReview', () => {
  let component: EditReview;
  let fixture: ComponentFixture<EditReview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditReview],
    }).compileComponents();

    fixture = TestBed.createComponent(EditReview);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
