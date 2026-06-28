import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsensusPageComponent } from './consensus-page.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ConsensusPageComponent', () => {
  let component: ConsensusPageComponent;
  let fixture: ComponentFixture<ConsensusPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConsensusPageComponent],
      imports: [HttpClientTestingModule]
    });
    fixture = TestBed.createComponent(ConsensusPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
