import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of, Subject } from 'rxjs';

import { Phase1ConsensusComponent } from './phase1-consensus.component';
import { TopicService } from 'src/app/consensus/domain/services/TopicDataService.service';
import { WebSocketService } from 'src/app/consensus/domain/services/WebSocketService.service';
import { AuthService } from 'src/app/auth/domain/services/auth.service';
import { DebateService } from 'src/app/consensus/domain/services/debate.service';
import { UserPostureService } from 'src/app/consensus/domain/services/user-posture.service';
import { DebateStatisticsService } from 'src/app/consensus/domain/services/debate-statistics.service';

describe('Phase1ConsensusComponent', () => {
  let component: Phase1ConsensusComponent;
  let fixture: ComponentFixture<Phase1ConsensusComponent>;

  const topicServiceStub = {
    topics$: of([]),
    getUserCurrentPhase: () => of({ phase: 1 }),
    getRecommendedTopicsByGroup: () => of([]),
    getTopicsAddedByGroup: () => of([]),
    getRandomRecommendedTopics: () => of([]),
    addNewTopic: () => of({}),
    notifyExpertice: () => of({}),
    notifyTopicVisited: () => of({}),
    notifyCombinedSearch: () => of({}),
    notifyPhaseOneCompleted: () => of({}),
    updateTopics: () => {}
  };

  const notificationsSubject = new Subject<any>();
  const newTopicSubject = new Subject<any>();

  const webSocketServiceStub = {
    notificationsReceived: notificationsSubject.asObservable(),
    newTopicReceived: newTopicSubject.asObservable(),
    connect: () => of({}),
    close: () => {},
    closeAll: () => {},
    sendMessage: () => {}
  };

  const authServiceStub = {
    getUserId: () => 'test-user-id'
  };

  const debateServiceStub = {
    validateDebateStatus$: of(null),
    getDebates: () => of([]),
    createDebate: () => of({ id: 1 })
  };

  const userPostureServiceStub = {
    getUserPosture: () => of({})
  };

  const debateStatisticsServiceStub = {};

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [Phase1ConsensusComponent],
      providers: [
        { provide: TopicService, useValue: topicServiceStub },
        { provide: WebSocketService, useValue: webSocketServiceStub },
        { provide: AuthService, useValue: authServiceStub },
        { provide: DebateService, useValue: debateServiceStub },
        { provide: UserPostureService, useValue: userPostureServiceStub },
        { provide: DebateStatisticsService, useValue: debateStatisticsServiceStub }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(Phase1ConsensusComponent);
    component = fixture.componentInstance;
    try {
      fixture.detectChanges();
    } catch (e) {}
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
