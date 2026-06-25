import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';

import { PostureDashboardComponent } from './posture-dashboard.component';
import { DebateStatisticsService } from 'src/app/consensus/domain/services/debate-statistics.service';

describe('PostureDashboardComponent', () => {
  let component: PostureDashboardComponent;
  let fixture: ComponentFixture<PostureDashboardComponent>;

  const debateStatisticsServiceMock = {
    getStatistics: jasmine.createSpy('getStatistics').and.returnValue(
      of({ total_agree: 0, total_disagree: 0, total_neutral: 0, total_active_users: 0 })
    ),
    sendDebateId: jasmine.createSpy('sendDebateId'),
    debateId$: of(null)
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostureDashboardComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [
        { provide: DebateStatisticsService, useValue: debateStatisticsServiceMock }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(PostureDashboardComponent);
    component = fixture.componentInstance;
    component.debateId = 1;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
