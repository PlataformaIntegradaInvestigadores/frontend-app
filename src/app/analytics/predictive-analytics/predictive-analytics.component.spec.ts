import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PredictiveAnalyticsComponent } from './predictive-analytics.component';

describe('PredictiveAnalyticsComponent', () => {
  let component: PredictiveAnalyticsComponent;
  let fixture: ComponentFixture<PredictiveAnalyticsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PredictiveAnalyticsComponent]
    });
    fixture = TestBed.createComponent(PredictiveAnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
