import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoauthorsGraphComponent } from './coauthors-graph.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('CoauthorsGraphComponent', () => {
  let component: CoauthorsGraphComponent;
  let fixture: ComponentFixture<CoauthorsGraphComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CoauthorsGraphComponent],
      imports: [HttpClientTestingModule, FormsModule, ReactiveFormsModule, RouterTestingModule]
    ,
      schemas: [NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(CoauthorsGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
