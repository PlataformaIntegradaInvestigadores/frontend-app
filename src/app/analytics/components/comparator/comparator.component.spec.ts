import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComparatorComponent } from './comparator.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ComparatorComponent', () => {
  let component: ComparatorComponent;
  let fixture: ComponentFixture<ComparatorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ComparatorComponent],
      imports: [HttpClientTestingModule]
    });
    fixture = TestBed.createComponent(ComparatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
