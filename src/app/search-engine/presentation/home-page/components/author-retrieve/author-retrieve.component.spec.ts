import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorRetrieveComponent } from './author-retrieve.component';

describe('AuthorRetrieveComponent', () => {
  let component: AuthorRetrieveComponent;
  let fixture: ComponentFixture<AuthorRetrieveComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuthorRetrieveComponent]
    });
    fixture = TestBed.createComponent(AuthorRetrieveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
