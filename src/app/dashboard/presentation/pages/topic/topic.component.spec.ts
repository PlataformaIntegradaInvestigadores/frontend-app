import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicComponent } from './topic.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('TopicComponent', () => {
  let component: TopicComponent;
  let fixture: ComponentFixture<TopicComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TopicComponent],
      imports: [HttpClientTestingModule]
    });
    fixture = TestBed.createComponent(TopicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
