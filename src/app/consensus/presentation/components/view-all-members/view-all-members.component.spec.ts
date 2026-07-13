import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAllMembersComponent } from './view-all-members.component';

describe('ViewAllMembersComponent', () => {
  let component: ViewAllMembersComponent;
  let fixture: ComponentFixture<ViewAllMembersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewAllMembersComponent]
    });
    fixture = TestBed.createComponent(ViewAllMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
