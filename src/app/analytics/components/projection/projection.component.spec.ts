import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectionComponent } from './projection.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ProjectionComponent', () => {
  let component: ProjectionComponent;
  let fixture: ComponentFixture<ProjectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectionComponent],
      imports: [HttpClientTestingModule]
    });
    fixture = TestBed.createComponent(ProjectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
