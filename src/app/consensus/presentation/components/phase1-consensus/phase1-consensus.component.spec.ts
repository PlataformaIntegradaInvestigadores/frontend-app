import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Phase1ConsensusComponent } from './phase1-consensus.component';

describe('Phase1ConsensusComponent', () => {
  let component: Phase1ConsensusComponent;
  let fixture: ComponentFixture<Phase1ConsensusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Phase1ConsensusComponent]
    });
    fixture = TestBed.createComponent(Phase1ConsensusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
