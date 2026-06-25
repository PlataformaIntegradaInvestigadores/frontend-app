import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { EcuadorContributionComponent } from './ecuador-contribution.component';

describe('EcuadorContributionComponent', () => {
  let component: EcuadorContributionComponent;
  let fixture: ComponentFixture<EcuadorContributionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EcuadorContributionComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
      schemas: [NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(EcuadorContributionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
