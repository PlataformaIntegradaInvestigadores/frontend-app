import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsensusPageComponent } from './consensus-page.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('ConsensusPageComponent', () => {
  let component: ConsensusPageComponent;
  let fixture: ComponentFixture<ConsensusPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, FormsModule],

      schemas: [NO_ERRORS_SCHEMA],

      declarations: [ConsensusPageComponent]
    });
    fixture = TestBed.createComponent(ConsensusPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
