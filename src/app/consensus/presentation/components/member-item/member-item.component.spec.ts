import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberItemComponent } from './member-item.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('MemberItemComponent', () => {
  let component: MemberItemComponent;
  let fixture: ComponentFixture<MemberItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MemberItemComponent],
      imports: [HttpClientTestingModule]
    });
    fixture = TestBed.createComponent(MemberItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
