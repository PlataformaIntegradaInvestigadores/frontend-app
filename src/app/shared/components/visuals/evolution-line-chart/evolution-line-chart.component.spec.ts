import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvolutionLineChartComponent } from './evolution-line-chart.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('EvolutionLineChartComponent', () => {
  let component: EvolutionLineChartComponent;
  let fixture: ComponentFixture<EvolutionLineChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EvolutionLineChartComponent],
      imports: [HttpClientTestingModule]
    });
    fixture = TestBed.createComponent(EvolutionLineChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
