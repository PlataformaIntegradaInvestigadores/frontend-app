import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleInformationComponent } from './article-information.component';

describe('ArticleInformationComponent', () => {
  let component: ArticleInformationComponent;
  let fixture: ComponentFixture<ArticleInformationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArticleInformationComponent]
    });
    fixture = TestBed.createComponent(ArticleInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
