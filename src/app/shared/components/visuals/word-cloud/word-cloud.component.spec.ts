import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WordCloudComponent } from './word-cloud.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('WordCloudComponent', () => {
  let component: WordCloudComponent;
  let fixture: ComponentFixture<WordCloudComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, FormsModule],

      schemas: [NO_ERRORS_SCHEMA],

      declarations: [WordCloudComponent]
    });
    fixture = TestBed.createComponent(WordCloudComponent);
    component = fixture.componentInstance;
    component.words = [];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
