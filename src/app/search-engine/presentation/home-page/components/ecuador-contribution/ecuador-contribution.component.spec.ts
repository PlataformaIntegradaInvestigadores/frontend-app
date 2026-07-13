import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EcuadorContributionComponent } from './ecuador-contribution.component';

describe('EcuadorContributionComponent', () => {
  let component: EcuadorContributionComponent;
  let fixture: ComponentFixture<EcuadorContributionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EcuadorContributionComponent]
    });
    fixture = TestBed.createComponent(EcuadorContributionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
