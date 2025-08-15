import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComparatorComponent } from './comparator.component';

describe('ComparatorComponent', () => {
  let component: ComparatorComponent;
  let fixture: ComponentFixture<ComparatorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ComparatorComponent]
    });
    fixture = TestBed.createComponent(ComparatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
