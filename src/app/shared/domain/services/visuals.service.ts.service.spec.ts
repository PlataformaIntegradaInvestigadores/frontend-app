import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { VisualsService } from './visuals.service';

describe('VisualsServiceTsService', () => {
  let service: VisualsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule]
    });
    service = TestBed.inject(VisualsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
