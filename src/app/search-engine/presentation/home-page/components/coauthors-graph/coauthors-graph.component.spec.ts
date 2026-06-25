import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { CoauthorsGraphComponent } from './coauthors-graph.component';
import { Author } from '../../../../../shared/interfaces/author.interface';

describe('CoauthorsGraphComponent', () => {
  let component: CoauthorsGraphComponent;
  let fixture: ComponentFixture<CoauthorsGraphComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CoauthorsGraphComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
      schemas: [NO_ERRORS_SCHEMA],
    });
    fixture = TestBed.createComponent(CoauthorsGraphComponent);
    component = fixture.componentInstance;
    component.author = {
      scopus_id: 123456,
      initials: 'J.D.',
      first_name: 'John',
      last_name: 'Doe',
    } as Author;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
