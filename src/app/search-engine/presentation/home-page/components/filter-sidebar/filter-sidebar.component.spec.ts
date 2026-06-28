import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterSidebarComponent } from './filter-sidebar.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('FilterSidebarComponent', () => {
  let component: FilterSidebarComponent;
  let fixture: ComponentFixture<FilterSidebarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FilterSidebarComponent],
      imports: [HttpClientTestingModule]
    });
    fixture = TestBed.createComponent(FilterSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
