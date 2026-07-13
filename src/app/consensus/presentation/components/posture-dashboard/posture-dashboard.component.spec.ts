import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostureDashboardComponent } from './posture-dashboard.component';

describe('PostureDashboardComponent', () => {
  let component: PostureDashboardComponent;
  let fixture: ComponentFixture<PostureDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostureDashboardComponent]
    });
    fixture = TestBed.createComponent(PostureDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
