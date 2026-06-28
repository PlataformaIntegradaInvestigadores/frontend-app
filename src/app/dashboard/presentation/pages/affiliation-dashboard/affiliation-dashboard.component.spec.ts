import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffiliationDashboardComponent } from './affiliation-dashboard.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AffiliationDashboardComponent', () => {
  let component: AffiliationDashboardComponent;
  let fixture: ComponentFixture<AffiliationDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AffiliationDashboardComponent],
      imports: [HttpClientTestingModule]
    });
    fixture = TestBed.createComponent(AffiliationDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
