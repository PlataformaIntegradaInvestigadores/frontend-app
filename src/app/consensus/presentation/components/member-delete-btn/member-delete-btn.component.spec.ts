import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { MemberDeleteBtnComponent } from './member-delete-btn.component';

describe('MemberDeleteBtnComponent', () => {
  let component: MemberDeleteBtnComponent;
  let fixture: ComponentFixture<MemberDeleteBtnComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MemberDeleteBtnComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
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
