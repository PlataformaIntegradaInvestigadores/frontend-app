import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeMapChartComponent } from './tree-map-chart.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('TreeMapChartComponent', () => {
  let component: TreeMapChartComponent;
  let fixture: ComponentFixture<TreeMapChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TreeMapChartComponent],
      imports: [HttpClientTestingModule, FormsModule, ReactiveFormsModule, RouterTestingModule]
    ,
      schemas: [NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(TreeMapChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
