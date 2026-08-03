import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResolveDisputeModal } from './resolve-dispute-modal';

describe('ResolveDisputeModal', () => {
  let component: ResolveDisputeModal;
  let fixture: ComponentFixture<ResolveDisputeModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResolveDisputeModal],
    }).compileComponents();

    fixture = TestBed.createComponent(ResolveDisputeModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
