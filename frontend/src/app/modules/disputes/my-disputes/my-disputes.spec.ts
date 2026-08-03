import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyDisputes } from './my-disputes';

describe('MyDisputes', () => {
  let component: MyDisputes;
  let fixture: ComponentFixture<MyDisputes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyDisputes],
    }).compileComponents();

    fixture = TestBed.createComponent(MyDisputes);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
