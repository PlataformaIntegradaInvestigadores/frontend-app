import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderDashboardComponent } from './header.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('HeaderDashboardComponent', () => {
  let component: HeaderDashboardComponent;
  let fixture: ComponentFixture<HeaderDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderDashboardComponent],
      imports: [HttpClientTestingModule]
    });
    fixture = TestBed.createComponent(HeaderDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
