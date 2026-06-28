import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorInformationComponent } from './author-information.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AuthorInformationComponent', () => {
  let component: AuthorInformationComponent;
  let fixture: ComponentFixture<AuthorInformationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuthorInformationComponent],
      imports: [HttpClientTestingModule]
    });
    fixture = TestBed.createComponent(AuthorInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
