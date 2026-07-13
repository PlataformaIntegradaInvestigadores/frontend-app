import { TestBed } from '@angular/core/testing';

import { PredictiveAnalyticsService } from './predictive-analytics.service';

describe('PredictiveAnalyticsService', () => {
  let service: PredictiveAnalyticsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PredictiveAnalyticsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
