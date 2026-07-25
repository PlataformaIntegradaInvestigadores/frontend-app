import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvolutionLineChartComponent } from './evolution-line-chart.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('EvolutionLineChartComponent', () => {
  let component: EvolutionLineChartComponent;
  let fixture: ComponentFixture<EvolutionLineChartComponent>;

  beforeEach(() => {
    spyOn(localStorage, 'getItem').and.returnValue('"test"');
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, FormsModule],

      schemas: [NO_ERRORS_SCHEMA],

      declarations: [EvolutionLineChartComponent]
    });
    fixture = TestBed.createComponent(EvolutionLineChartComponent);
    component = fixture.componentInstance;
    component.evolutionData = [];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
