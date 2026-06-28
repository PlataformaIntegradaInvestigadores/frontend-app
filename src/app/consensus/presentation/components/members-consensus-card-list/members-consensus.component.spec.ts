import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembersConsensusComponent } from './members-consensus.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('MembersConsensusComponent', () => {
  let component: MembersConsensusComponent;
  let fixture: ComponentFixture<MembersConsensusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MembersConsensusComponent],
      imports: [HttpClientTestingModule]
    });
    fixture = TestBed.createComponent(MembersConsensusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
