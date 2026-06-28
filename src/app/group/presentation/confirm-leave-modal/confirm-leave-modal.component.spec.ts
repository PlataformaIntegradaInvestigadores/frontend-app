import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmLeaveModalComponent } from './confirm-leave-modal.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ConfirmLeaveModalComponent', () => {
  let component: ConfirmLeaveModalComponent;
  let fixture: ComponentFixture<ConfirmLeaveModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmLeaveModalComponent],
      imports: [HttpClientTestingModule]
    });
    fixture = TestBed.createComponent(ConfirmLeaveModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
