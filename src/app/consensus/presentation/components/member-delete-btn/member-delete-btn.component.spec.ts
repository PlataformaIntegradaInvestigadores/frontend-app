import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberDeleteBtnComponent } from './member-delete-btn.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('MemberDeleteBtnComponent', () => {
  let component: MemberDeleteBtnComponent;
  let fixture: ComponentFixture<MemberDeleteBtnComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MemberDeleteBtnComponent],
      imports: [HttpClientTestingModule, FormsModule, ReactiveFormsModule, RouterTestingModule]
    ,
      schemas: [NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(MemberDeleteBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
