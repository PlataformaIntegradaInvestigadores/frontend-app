import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { Phase2ConsensusComponent } from './phase2-consensus.component';

describe('Phase2ConsensusComponent', () => {
  let component: Phase2ConsensusComponent;
  let fixture: ComponentFixture<Phase2ConsensusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [Phase2ConsensusComponent, HttpClientTestingModule, RouterTestingModule],
      schemas: [NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(Phase2ConsensusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
