import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicDashboardComponent } from './topic-dashboard.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('TopicDashboardComponent', () => {
  let component: TopicDashboardComponent;
  let fixture: ComponentFixture<TopicDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TopicDashboardComponent],
      imports: [HttpClientTestingModule]
    });
    fixture = TestBed.createComponent(TopicDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
