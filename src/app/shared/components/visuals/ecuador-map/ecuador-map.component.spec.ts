import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EcuadorMapComponent } from './ecuador-map.component';

describe('EcuadorMapComponent', () => {
  let component: EcuadorMapComponent;
  let fixture: ComponentFixture<EcuadorMapComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EcuadorMapComponent]
    });
    fixture = TestBed.createComponent(EcuadorMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
