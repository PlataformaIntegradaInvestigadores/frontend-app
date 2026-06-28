import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Phase1ConsensusComponent } from './phase1-consensus.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('Phase1ConsensusComponent', () => {
  let component: Phase1ConsensusComponent;
  let fixture: ComponentFixture<Phase1ConsensusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Phase1ConsensusComponent],
      imports: [HttpClientTestingModule, FormsModule, ReactiveFormsModule, RouterTestingModule]
    ,
      schemas: [NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(Phase1ConsensusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
