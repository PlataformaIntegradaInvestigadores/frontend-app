import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterDashboardComponent } from './footer.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('FooterDashboardComponent', () => {
  let component: FooterDashboardComponent;
  let fixture: ComponentFixture<FooterDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FooterDashboardComponent],
      imports: [HttpClientTestingModule]
    });
    fixture = TestBed.createComponent(FooterDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
