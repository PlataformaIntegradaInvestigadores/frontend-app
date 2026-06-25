import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { SelectPostureComponent } from './select-posture.component';

describe('SelectPostureComponent', () => {
  let component: SelectPostureComponent;
  let fixture: ComponentFixture<SelectPostureComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectPostureComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
      schemas: [NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(SelectPostureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
