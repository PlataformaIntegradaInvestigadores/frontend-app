import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SatisfactionLevelComponent } from './satisfaction-level.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('SatisfactionLevelComponent', () => {
  let component: SatisfactionLevelComponent;
  let fixture: ComponentFixture<SatisfactionLevelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SatisfactionLevelComponent],
      imports: [HttpClientTestingModule, FormsModule, ReactiveFormsModule, RouterTestingModule]
    ,
      schemas: [NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(SatisfactionLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
