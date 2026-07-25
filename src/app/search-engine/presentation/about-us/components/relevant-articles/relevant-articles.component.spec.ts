import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelevantArticlesComponent } from './relevant-articles.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('RelevantArticlesComponent', () => {
  let component: RelevantArticlesComponent;
  let fixture: ComponentFixture<RelevantArticlesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, FormsModule],

      schemas: [NO_ERRORS_SCHEMA],

      declarations: [RelevantArticlesComponent]
    });
    fixture = TestBed.createComponent(RelevantArticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
