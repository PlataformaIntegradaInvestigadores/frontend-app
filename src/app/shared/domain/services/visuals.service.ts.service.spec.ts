import { TestBed } from '@angular/core/testing';

import { VisualsService } from './visuals.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('VisualsServiceTsService', () => {
  let service: VisualsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]});
    service = TestBed.inject(VisualsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
