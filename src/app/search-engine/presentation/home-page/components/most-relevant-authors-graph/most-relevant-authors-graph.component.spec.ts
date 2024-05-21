import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostRelevantAuthorsGraphComponent } from './most-relevant-authors-graph.component';

describe('MostRelevantAuthorsGraphComponent', () => {
  let component: MostRelevantAuthorsGraphComponent;
  let fixture: ComponentFixture<MostRelevantAuthorsGraphComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MostRelevantAuthorsGraphComponent]
    });
    fixture = TestBed.createComponent(MostRelevantAuthorsGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
