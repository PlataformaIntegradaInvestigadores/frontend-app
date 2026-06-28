import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnMenuGroupComponent } from './btn-menu-group.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('BtnMenuGroupComponent', () => {
  let component: BtnMenuGroupComponent;
  let fixture: ComponentFixture<BtnMenuGroupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BtnMenuGroupComponent],
      imports: [HttpClientTestingModule, FormsModule, ReactiveFormsModule, RouterTestingModule]
    ,
      schemas: [NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(BtnMenuGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
