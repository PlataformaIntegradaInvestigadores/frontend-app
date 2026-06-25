import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AuthorInformationComponent } from './author-information.component';
import { Author } from '../../../../../shared/interfaces/author.interface';

describe('AuthorInformationComponent', () => {
  let component: AuthorInformationComponent;
  let fixture: ComponentFixture<AuthorInformationComponent>;

  const mockAuthor: Author = {
    name: 'Test Author',
    email: 'test@example.com',
    affiliation: 'Test University',
    articles: 10,
    topics: [],
    scopus_id: 12345,
    first_name: 'Test',
    last_name: 'Author',
    auth_name: 'T. Author',
    initials: 'TA',
    current_affiliation: 'Test University',
    citation_count: 50
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuthorInformationComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
      schemas: [NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(AuthorInformationComponent);
    component = fixture.componentInstance;
    component.author = mockAuthor;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
