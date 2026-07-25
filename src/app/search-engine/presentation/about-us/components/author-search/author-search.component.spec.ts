import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorSearchComponent } from './author-search.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('AuthorSearchComponent', () => {
  let component: AuthorSearchComponent;
  let fixture: ComponentFixture<AuthorSearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, FormsModule],

      schemas: [NO_ERRORS_SCHEMA],

      declarations: [AuthorSearchComponent]
    });
    fixture = TestBed.createComponent(AuthorSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
