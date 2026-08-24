import { TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { PostActionsComponent } from './post-actions.component';

describe('PostActionsComponent', () => {
  let component: PostActionsComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostActionsComponent],
      schemas: [NO_ERRORS_SCHEMA],
    });
    component = TestBed.createComponent(PostActionsComponent).componentInstance;
    component.post = { id: 'p-1', is_liked: false } as any;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('defaults showActions/showComments to true and isLiking/showCommentsSection to false', () => {
    expect(component.showActions).toBeTrue();
    expect(component.showComments).toBeTrue();
    expect(component.isLiking).toBeFalse();
    expect(component.showCommentsSection).toBeFalse();
  });

  it('onLikeClick emits likeClick', () => {
    let emitted = false;
    component.likeClick.subscribe(() => (emitted = true));
    component.onLikeClick();
    expect(emitted).toBeTrue();
  });

  it('onCommentToggle emits commentToggle', () => {
    let emitted = false;
    component.commentToggle.subscribe(() => (emitted = true));
    component.onCommentToggle();
    expect(emitted).toBeTrue();
  });
});
