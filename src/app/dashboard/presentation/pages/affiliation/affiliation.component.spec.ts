import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { LayoutModule } from '@angular/cdk/layout';
import { of } from 'rxjs';

import { AffiliationComponent } from './affiliation.component';
import { DashboardService } from 'src/app/dashboard/domain/services/dashboard.service';
import { AffiliationService } from 'src/app/dashboard/domain/services/affiliation.service';

describe('AffiliationComponent', () => {
  let component: AffiliationComponent;
  let fixture: ComponentFixture<AffiliationComponent>;

  const dashboardServiceMock = {
    getBarInfo: jasmine.createSpy('getBarInfo').and.returnValue(of([]))
  };

  const affiliationServiceMock = {
    getId: jasmine.createSpy('getId').and.returnValue(of({ scopus_id: '123' }))
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AffiliationComponent],
      imports: [HttpClientTestingModule, RouterTestingModule, LayoutModule],
      providers: [
        { provide: DashboardService, useValue: dashboardServiceMock },
        { provide: AffiliationService, useValue: affiliationServiceMock }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(AffiliationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
