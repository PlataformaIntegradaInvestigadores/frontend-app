import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectionComponent } from './projection.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('ProjectionComponent', () => {
  let component: ProjectionComponent;
  let fixture: ComponentFixture<ProjectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectionComponent],
      imports: [HttpClientTestingModule, FormsModule, ReactiveFormsModule, RouterTestingModule]
    ,
      schemas: [NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(ProjectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
