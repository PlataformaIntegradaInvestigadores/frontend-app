import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Subject, of } from 'rxjs';

import { Phase3ConsensusComponent } from './phase3-consensus.component';
import { WebSocketPhase3Service } from 'src/app/consensus/domain/services/websocket-phase3.service';
import { DebateStatisticsService } from 'src/app/consensus/domain/services/debate-statistics.service';
import { TopicService } from 'src/app/consensus/domain/services/TopicDataService.service';

describe('Phase3ConsensusComponent', () => {
  let component: Phase3ConsensusComponent;
  let fixture: ComponentFixture<Phase3ConsensusComponent>;

  const mockWebSocketPhase3Service = {
    connect: jasmine.createSpy('connect').and.returnValue(new Subject()),
    sendMessage: jasmine.createSpy('sendMessage'),
    close: jasmine.createSpy('close'),
    closeAll: jasmine.createSpy('closeAll'),
    notificationReceived: new Subject(),
    userSatisfactionReceived: new Subject(),
    phaseUpdateReceived: new Subject(),
    userRemoveReceived: new Subject(),
  };

  const mockDebateStatisticsService = {
    debateId$: new Subject<number>().asObservable(),
    getStatistics: jasmine.createSpy('getStatistics').and.returnValue(of({ total_agree: 0, total_disagree: 0, total_neutral: 0 })),
    sendDebateId: jasmine.createSpy('sendDebateId'),
  };

  const mockTopicService = {
    getConsensusResults: jasmine.createSpy('getConsensusResults').and.returnValue(of({ results: [] })),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Phase3ConsensusComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [
        { provide: WebSocketPhase3Service, useValue: mockWebSocketPhase3Service },
        { provide: DebateStatisticsService, useValue: mockDebateStatisticsService },
        { provide: TopicService, useValue: mockTopicService },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    });
    fixture = TestBed.createComponent(Phase3ConsensusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
