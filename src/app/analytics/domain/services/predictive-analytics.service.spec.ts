import { TestBed } from '@angular/core/testing';

import { PredictiveAnalyticsService } from './predictive-analytics.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('PredictiveAnalyticsService', () => {
  let service: PredictiveAnalyticsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule, ReactiveFormsModule, RouterTestingModule],
      schemas: [NO_ERRORS_SCHEMA]
    );
    service = TestBed.inject(PredictiveAnalyticsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
