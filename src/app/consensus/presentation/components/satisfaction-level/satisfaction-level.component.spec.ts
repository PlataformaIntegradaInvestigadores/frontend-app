import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SatisfactionLevelComponent } from './satisfaction-level.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('SatisfactionLevelComponent', () => {
  let component: SatisfactionLevelComponent;
  let fixture: ComponentFixture<SatisfactionLevelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SatisfactionLevelComponent],
      imports: [HttpClientTestingModule]
    });
    fixture = TestBed.createComponent(SatisfactionLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
