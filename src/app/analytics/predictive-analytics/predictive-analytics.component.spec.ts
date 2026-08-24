import { TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { PredictiveAnalyticsComponent } from './predictive-analytics.component';

describe('PredictiveAnalyticsComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PredictiveAnalyticsComponent],
      schemas: [NO_ERRORS_SCHEMA],
    });
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(PredictiveAnalyticsComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });
});
