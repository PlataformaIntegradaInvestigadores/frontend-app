import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralComponent } from './general.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('GeneralComponent', () => {
  let component: GeneralComponent;
  let fixture: ComponentFixture<GeneralComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GeneralComponent],
      imports: [HttpClientTestingModule, FormsModule, ReactiveFormsModule, RouterTestingModule]
    ,
      schemas: [NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(GeneralComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
