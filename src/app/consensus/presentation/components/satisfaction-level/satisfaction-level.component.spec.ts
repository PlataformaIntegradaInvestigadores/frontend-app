import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';

import { SatisfactionLevelComponent } from './satisfaction-level.component';
import { TopicService } from 'src/app/consensus/domain/services/TopicDataService.service';
import { WebSocketPhase3Service } from 'src/app/consensus/domain/services/websocket-phase3.service';
import { AuthService } from 'src/app/auth/domain/services/auth.service';
import { Subject } from 'rxjs';

describe('SatisfactionLevelComponent', () => {
  let component: SatisfactionLevelComponent;
  let fixture: ComponentFixture<SatisfactionLevelComponent>;

  const topicServiceMock = {
    getSatisfactionCounts: jasmine.createSpy('getSatisfactionCounts').and.returnValue(of({ counts: {} })),
    saveUserSatisfaction: jasmine.createSpy('saveUserSatisfaction').and.returnValue(of({}))
  };

  const webSocketPhase3ServiceMock = {
    userSatisfactionReceived: new Subject<any>(),
    connect: jasmine.createSpy('connect').and.returnValue({}),
    close: jasmine.createSpy('close')
  };

  const authServiceMock = {
    getUserId: jasmine.createSpy('getUserId').and.returnValue('test-user-id')
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SatisfactionLevelComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [
        { provide: TopicService, useValue: topicServiceMock },
        { provide: WebSocketPhase3Service, useValue: webSocketPhase3ServiceMock },
        { provide: AuthService, useValue: authServiceMock }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(SatisfactionLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
