import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembersConsensusComponent } from './members-consensus.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('MembersConsensusComponent', () => {
  let component: MembersConsensusComponent;
  let fixture: ComponentFixture<MembersConsensusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MembersConsensusComponent],
      imports: [HttpClientTestingModule, FormsModule, ReactiveFormsModule, RouterTestingModule]
    ,
      schemas: [NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(MembersConsensusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
