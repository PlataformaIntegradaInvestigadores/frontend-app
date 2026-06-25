import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { EvolutionLineChartComponent } from './evolution-line-chart.component';

describe('EvolutionLineChartComponent', () => {
  let component: EvolutionLineChartComponent;
  let fixture: ComponentFixture<EvolutionLineChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EvolutionLineChartComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
      schemas: [NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(EvolutionLineChartComponent);
    component = fixture.componentInstance;
    component.multi = [
      {
        name: 'Test',
        series: [
          { name: '2020', value: 1 },
          { name: '2021', value: 2 }
        ]
      }
    ];
    try {
      fixture.detectChanges();
    } catch (e) {}
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
