import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Phase3ConsensusComponent } from './phase3-consensus.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('Phase3ConsensusComponent', () => {
  let component: Phase3ConsensusComponent;
  let fixture: ComponentFixture<Phase3ConsensusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Phase3ConsensusComponent],
      imports: [HttpClientTestingModule]
    });
    fixture = TestBed.createComponent(Phase3ConsensusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
