import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorSearchComponent } from './author-search.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AuthorSearchComponent', () => {
  let component: AuthorSearchComponent;
  let fixture: ComponentFixture<AuthorSearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuthorSearchComponent],
      imports: [HttpClientTestingModule]
    });
    fixture = TestBed.createComponent(AuthorSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
