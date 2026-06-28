import { TestBed } from '@angular/core/testing';

import { PredictiveAnalyticsService } from './predictive-analytics.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('PredictiveAnalyticsService', () => {
  let service: PredictiveAnalyticsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]});
    service = TestBed.inject(PredictiveAnalyticsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
