import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeMapChartComponent } from './tree-map-chart.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('TreeMapChartComponent', () => {
  let component: TreeMapChartComponent;
  let fixture: ComponentFixture<TreeMapChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TreeMapChartComponent],
      imports: [HttpClientTestingModule]
    });
    fixture = TestBed.createComponent(TreeMapChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
