import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyticsDashboardComponent } from './analytics-dashboard.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AnalyticsDashboardComponent', () => {
  let component: AnalyticsDashboardComponent;
  let fixture: ComponentFixture<AnalyticsDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AnalyticsDashboardComponent],
      imports: [HttpClientTestingModule]
    });
    fixture = TestBed.createComponent(AnalyticsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
