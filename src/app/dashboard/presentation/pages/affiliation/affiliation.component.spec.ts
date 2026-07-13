import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffiliationComponent } from './affiliation.component';

describe('AffiliationComponent', () => {
  let component: AffiliationComponent;
  let fixture: ComponentFixture<AffiliationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AffiliationComponent]
    });
    fixture = TestBed.createComponent(AffiliationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
