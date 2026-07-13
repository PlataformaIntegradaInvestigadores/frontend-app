import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsensusPageComponent } from './consensus-page.component';

describe('ConsensusPageComponent', () => {
  let component: ConsensusPageComponent;
  let fixture: ComponentFixture<ConsensusPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConsensusPageComponent]
    });
    fixture = TestBed.createComponent(ConsensusPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
