import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphicAnalyticComponent } from './graphic-analytic.component';

describe('GraphicAnalyticComponent', () => {
  let component: GraphicAnalyticComponent;
  let fixture: ComponentFixture<GraphicAnalyticComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GraphicAnalyticComponent]
    });
    fixture = TestBed.createComponent(GraphicAnalyticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
