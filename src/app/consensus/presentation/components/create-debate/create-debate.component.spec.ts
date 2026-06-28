import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDebateComponent } from './create-debate.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CreateDebateComponent', () => {
  let component: CreateDebateComponent;
  let fixture: ComponentFixture<CreateDebateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateDebateComponent],
      imports: [HttpClientTestingModule]
    });
    fixture = TestBed.createComponent(CreateDebateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
