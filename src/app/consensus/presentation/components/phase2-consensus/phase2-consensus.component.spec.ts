import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Phase2ConsensusComponent } from './phase2-consensus.component';

describe('Phase2ConsensusComponent', () => {
  let component: Phase2ConsensusComponent;
  let fixture: ComponentFixture<Phase2ConsensusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Phase2ConsensusComponent]
    });
    fixture = TestBed.createComponent(Phase2ConsensusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
