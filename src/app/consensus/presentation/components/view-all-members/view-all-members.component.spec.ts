import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAllMembersComponent } from './view-all-members.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('ViewAllMembersComponent', () => {
  let component: ViewAllMembersComponent;
  let fixture: ComponentFixture<ViewAllMembersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, FormsModule],

      schemas: [NO_ERRORS_SCHEMA],

      declarations: [ViewAllMembersComponent]
    });
    fixture = TestBed.createComponent(ViewAllMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
