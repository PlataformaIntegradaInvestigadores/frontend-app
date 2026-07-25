import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicDashboardComponent } from './topic-dashboard.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('TopicDashboardComponent', () => {
  let component: TopicDashboardComponent;
  let fixture: ComponentFixture<TopicDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TopicDashboardComponent],
      imports: [HttpClientTestingModule, FormsModule, ReactiveFormsModule, RouterTestingModule]
    ,
      schemas: [NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(TopicDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
