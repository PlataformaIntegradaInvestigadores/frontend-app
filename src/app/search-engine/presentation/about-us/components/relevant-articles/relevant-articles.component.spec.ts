import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelevantArticlesComponent } from './relevant-articles.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('RelevantArticlesComponent', () => {
  let component: RelevantArticlesComponent;
  let fixture: ComponentFixture<RelevantArticlesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RelevantArticlesComponent],
      imports: [HttpClientTestingModule]
    });
    fixture = TestBed.createComponent(RelevantArticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
