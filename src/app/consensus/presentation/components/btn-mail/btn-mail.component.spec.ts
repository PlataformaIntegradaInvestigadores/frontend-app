import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnMailComponent } from './btn-mail.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('BtnMailComponent', () => {
  let component: BtnMailComponent;
  let fixture: ComponentFixture<BtnMailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BtnMailComponent],
      imports: [HttpClientTestingModule]
    });
    fixture = TestBed.createComponent(BtnMailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
