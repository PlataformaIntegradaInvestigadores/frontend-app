import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostureDashboardComponent } from './posture-dashboard.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('PostureDashboardComponent', () => {
  let component: PostureDashboardComponent;
  let fixture: ComponentFixture<PostureDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostureDashboardComponent],
      imports: [HttpClientTestingModule]
    });
    fixture = TestBed.createComponent(PostureDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
