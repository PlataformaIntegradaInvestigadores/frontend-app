import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffiliationComponent } from './affiliation.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('AffiliationComponent', () => {
  let component: AffiliationComponent;
  let fixture: ComponentFixture<AffiliationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AffiliationComponent],
      imports: [HttpClientTestingModule, FormsModule, ReactiveFormsModule, RouterTestingModule]
    ,
      schemas: [NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(AffiliationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
