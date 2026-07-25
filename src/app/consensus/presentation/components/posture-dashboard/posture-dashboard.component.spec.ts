import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostureDashboardComponent } from './posture-dashboard.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('PostureDashboardComponent', () => {
  let component: PostureDashboardComponent;
  let fixture: ComponentFixture<PostureDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, FormsModule],

      schemas: [NO_ERRORS_SCHEMA],

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
