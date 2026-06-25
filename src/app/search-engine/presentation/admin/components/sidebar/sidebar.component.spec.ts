import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarDashboardComponent } from './sidebar.component';

describe('SidebarDashboardComponent', () => {
  let component: SidebarDashboardComponent;
  let fixture: ComponentFixture<SidebarDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SidebarDashboardComponent]
    });
    fixture = TestBed.createComponent(SidebarDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
