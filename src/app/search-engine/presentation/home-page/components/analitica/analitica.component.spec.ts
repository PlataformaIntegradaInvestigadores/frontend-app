import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnaliticaComponent } from './analitica.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AnaliticaComponent', () => {
  let component: AnaliticaComponent;
  let fixture: ComponentFixture<AnaliticaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AnaliticaComponent],
      imports: [HttpClientTestingModule]
    });
    fixture = TestBed.createComponent(AnaliticaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
