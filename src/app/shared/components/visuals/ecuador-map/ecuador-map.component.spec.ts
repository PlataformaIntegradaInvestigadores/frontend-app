import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EcuadorMapComponent } from './ecuador-map.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('EcuadorMapComponent', () => {
  let component: EcuadorMapComponent;
  let fixture: ComponentFixture<EcuadorMapComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EcuadorMapComponent],
      imports: [HttpClientTestingModule, FormsModule, ReactiveFormsModule, RouterTestingModule]
    ,
      schemas: [NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(EcuadorMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
