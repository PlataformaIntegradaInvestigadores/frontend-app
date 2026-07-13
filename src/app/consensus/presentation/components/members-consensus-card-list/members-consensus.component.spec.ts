import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembersConsensusComponent } from './members-consensus.component';

describe('MembersConsensusComponent', () => {
  let component: MembersConsensusComponent;
  let fixture: ComponentFixture<MembersConsensusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MembersConsensusComponent]
    });
    fixture = TestBed.createComponent(MembersConsensusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
