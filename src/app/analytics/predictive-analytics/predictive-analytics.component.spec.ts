import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PredictiveAnalyticsComponent } from './predictive-analytics.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('PredictiveAnalyticsComponent', () => {
  let component: PredictiveAnalyticsComponent;
  let fixture: ComponentFixture<PredictiveAnalyticsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PredictiveAnalyticsComponent],
      imports: [HttpClientTestingModule, FormsModule, ReactiveFormsModule, RouterTestingModule]
    ,
      schemas: [NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(PredictiveAnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
