import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectPostureComponent } from './select-posture.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('SelectPostureComponent', () => {
  let component: SelectPostureComponent;
  let fixture: ComponentFixture<SelectPostureComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectPostureComponent],
      imports: [HttpClientTestingModule]
    });
    fixture = TestBed.createComponent(SelectPostureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
