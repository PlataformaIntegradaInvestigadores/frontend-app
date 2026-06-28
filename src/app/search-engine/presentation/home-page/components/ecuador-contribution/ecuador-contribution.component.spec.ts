import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EcuadorContributionComponent } from './ecuador-contribution.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('EcuadorContributionComponent', () => {
  let component: EcuadorContributionComponent;
  let fixture: ComponentFixture<EcuadorContributionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EcuadorContributionComponent],
      imports: [HttpClientTestingModule]
    });
    fixture = TestBed.createComponent(EcuadorContributionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
