import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeMapChartComponent } from './tree-map-chart.component';

describe('TreeMapChartComponent', () => {
  let component: TreeMapChartComponent;
  let fixture: ComponentFixture<TreeMapChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TreeMapChartComponent]
    });
    fixture = TestBed.createComponent(TreeMapChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
