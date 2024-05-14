import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Phase1ConsensusNotificationComponent } from './phase1-consensus-notification.component';

describe('Phase1ConsensusNotificationComponent', () => {
  let component: Phase1ConsensusNotificationComponent;
  let fixture: ComponentFixture<Phase1ConsensusNotificationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Phase1ConsensusNotificationComponent]
    });
    fixture = TestBed.createComponent(Phase1ConsensusNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
