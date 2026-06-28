import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoauthorsGraphComponent } from './coauthors-graph.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CoauthorsGraphComponent', () => {
  let component: CoauthorsGraphComponent;
  let fixture: ComponentFixture<CoauthorsGraphComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CoauthorsGraphComponent],
      imports: [HttpClientTestingModule]
    });
    fixture = TestBed.createComponent(CoauthorsGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
