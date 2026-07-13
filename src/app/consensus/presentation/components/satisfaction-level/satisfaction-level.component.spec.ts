import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SatisfactionLevelComponent } from './satisfaction-level.component';

describe('SatisfactionLevelComponent', () => {
  let component: SatisfactionLevelComponent;
  let fixture: ComponentFixture<SatisfactionLevelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SatisfactionLevelComponent]
    });
    fixture = TestBed.createComponent(SatisfactionLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
