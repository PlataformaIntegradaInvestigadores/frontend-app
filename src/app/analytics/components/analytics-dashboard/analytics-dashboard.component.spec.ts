import { TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AnalyticsDashboardComponent } from './analytics-dashboard.component';

describe('AnalyticsDashboardComponent', () => {
  let component: AnalyticsDashboardComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AnalyticsDashboardComponent],
      schemas: [NO_ERRORS_SCHEMA],
    });
    component = TestBed.createComponent(AnalyticsDashboardComponent).componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('defaults activeTab to proyeccion', () => {
    expect(component.activeTab).toBe('proyeccion');
  });

  it('setActiveTab switches the active tab', () => {
    component.setActiveTab('ranking');
    expect(component.activeTab).toBe('ranking');
    component.setActiveTab('modelo');
    expect(component.activeTab).toBe('modelo');
  });
});
