import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WordCloudComponent } from './word-cloud.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('WordCloudComponent', () => {
  let component: WordCloudComponent;
  let fixture: ComponentFixture<WordCloudComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WordCloudComponent],
      imports: [HttpClientTestingModule]
    });
    fixture = TestBed.createComponent(WordCloudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
