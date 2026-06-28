import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberDeleteBtnComponent } from './member-delete-btn.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('MemberDeleteBtnComponent', () => {
  let component: MemberDeleteBtnComponent;
  let fixture: ComponentFixture<MemberDeleteBtnComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MemberDeleteBtnComponent],
      imports: [HttpClientTestingModule]
    });
    fixture = TestBed.createComponent(MemberDeleteBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
