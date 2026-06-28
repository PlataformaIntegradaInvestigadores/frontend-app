import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorTopicsComponent } from './author-topics.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AuthorTopicsComponent', () => {
  let component: AuthorTopicsComponent;
  let fixture: ComponentFixture<AuthorTopicsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuthorTopicsComponent],
      imports: [HttpClientTestingModule]
    });
    fixture = TestBed.createComponent(AuthorTopicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
