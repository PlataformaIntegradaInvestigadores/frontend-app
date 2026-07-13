import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnMenuGroupComponent } from './btn-menu-group.component';

describe('BtnMenuGroupComponent', () => {
  let component: BtnMenuGroupComponent;
  let fixture: ComponentFixture<BtnMenuGroupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BtnMenuGroupComponent]
    });
    fixture = TestBed.createComponent(BtnMenuGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
