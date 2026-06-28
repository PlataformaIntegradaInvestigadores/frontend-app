import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelDetailsComponent } from './model-details.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ModelDetailsComponent', () => {
  let component: ModelDetailsComponent;
  let fixture: ComponentFixture<ModelDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModelDetailsComponent],
      imports: [HttpClientTestingModule]
    });
    fixture = TestBed.createComponent(ModelDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
