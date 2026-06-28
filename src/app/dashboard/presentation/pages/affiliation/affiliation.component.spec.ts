import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffiliationComponent } from './affiliation.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AffiliationComponent', () => {
  let component: AffiliationComponent;
  let fixture: ComponentFixture<AffiliationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AffiliationComponent],
      imports: [HttpClientTestingModule]
    });
    fixture = TestBed.createComponent(AffiliationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
