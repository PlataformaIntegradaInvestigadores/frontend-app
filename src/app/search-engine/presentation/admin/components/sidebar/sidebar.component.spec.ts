import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarDashboardComponent } from './sidebar.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('SidebarDashboardComponent', () => {
  let component: SidebarDashboardComponent;
  let fixture: ComponentFixture<SidebarDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SidebarDashboardComponent],
      imports: [HttpClientTestingModule]
    });
    fixture = TestBed.createComponent(SidebarDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
