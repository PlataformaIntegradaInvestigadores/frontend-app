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
      imports: [HttpClientTestingModule, RouterTestingModule, FormsModule],

      schemas: [NO_ERRORS_SCHEMA],

      declarations: [CoauthorsGraphComponent]
    });
    fixture = TestBed.createComponent(CoauthorsGraphComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
