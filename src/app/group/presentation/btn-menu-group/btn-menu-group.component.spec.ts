import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnMenuGroupComponent } from './btn-menu-group.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('BtnMenuGroupComponent', () => {
  let component: BtnMenuGroupComponent;
  let fixture: ComponentFixture<BtnMenuGroupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BtnMenuGroupComponent],
      imports: [HttpClientTestingModule]
    });
    fixture = TestBed.createComponent(BtnMenuGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
