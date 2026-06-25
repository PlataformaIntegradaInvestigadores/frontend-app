import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { AffiliationDashboardComponent } from './affiliation-dashboard.component';

describe('AffiliationDashboardComponent', () => {
  let component: AffiliationDashboardComponent;
  let fixture: ComponentFixture<AffiliationDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AffiliationDashboardComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
      schemas: [NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(AffiliationDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
