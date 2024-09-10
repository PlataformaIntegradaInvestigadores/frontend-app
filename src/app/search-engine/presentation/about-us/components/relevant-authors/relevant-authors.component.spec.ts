import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelevantAuthorsComponent } from './relevant-authors.component';

describe('RelevantAuthorsComponent', () => {
  let component: RelevantAuthorsComponent;
  let fixture: ComponentFixture<RelevantAuthorsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RelevantAuthorsComponent]
    });
    fixture = TestBed.createComponent(RelevantAuthorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
