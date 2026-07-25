import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EcuadorContributionComponent } from './ecuador-contribution.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('EcuadorContributionComponent', () => {
  let component: EcuadorContributionComponent;
  let fixture: ComponentFixture<EcuadorContributionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, FormsModule],

      schemas: [NO_ERRORS_SCHEMA],

      declarations: [EcuadorContributionComponent]
    });
    fixture = TestBed.createComponent(EcuadorContributionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
