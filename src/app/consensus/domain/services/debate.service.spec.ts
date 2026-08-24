import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DebateService } from './debate.service';
import { environment } from 'src/environments/environment';
import { Debate } from '../entities/debate.interface';

describe('DebateService', () => {
  let service: DebateService;
  let httpMock: HttpTestingController;
  const apiUrl = `${environment.apiSocial}/v1/groups/`;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DebateService],
    });
    service = TestBed.inject(DebateService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getDebates', () => {
    it('throws for an empty/blank groupId without hitting the API', () => {
      expect(() => service.getDebates('   ')).toThrowError(
        'El groupId es requerido para obtener los debates.',
      );
      httpMock.expectNone(() => true);
    });

    it('GETs the group debates endpoint', () => {
      service.getDebates('g-1').subscribe();
      const req = httpMock.expectOne(`${apiUrl}g-1/debates/`);
      expect(req.request.method).toBe('GET');
      req.flush([] as Debate[]);
    });
  });

  it('createDebate POSTs to the group debates endpoint', () => {
    service.createDebate('g-1', { title: 'Topic' } as any).subscribe();
    const req = httpMock.expectOne(`${apiUrl}g-1/debates/`);
    expect(req.request.method).toBe('POST');
    req.flush({});
  });

  it('getDebateDetails GETs the specific debate', () => {
    service.getDebateDetails('g-1', 5).subscribe();
    const req = httpMock.expectOne(`${apiUrl}g-1/debates/5/`);
    expect(req.request.method).toBe('GET');
    req.flush({});
  });

  describe('validateDebateStatus', () => {
    it('maps the open-debate detail message to is_open: true', (done) => {
      service.validateDebateStatus('g-1', 5).subscribe((res) => {
        expect(res).toEqual({ is_open: true });
        done();
      });
      const req = httpMock.expectOne(`${apiUrl}g-1/debates/5/validate-status/`);
      req.flush({ detail: 'El debate está abierto.' });
    });

    it('maps any other detail message to is_open: false', (done) => {
      service.validateDebateStatus('g-1', 5).subscribe((res) => {
        expect(res).toEqual({ is_open: false });
        done();
      });
      const req = httpMock.expectOne(`${apiUrl}g-1/debates/5/validate-status/`);
      req.flush({ detail: 'El debate está cerrado.' });
    });
  });

  it('closeDebate POSTs to the close endpoint', () => {
    service.closeDebate('g-1', 5).subscribe();
    const req = httpMock.expectOne(`${apiUrl}g-1/debates/5/close/`);
    expect(req.request.method).toBe('POST');
    req.flush({});
  });

  it('triggerValidateDebateStatus emits on validateDebateStatus$', (done) => {
    service.validateDebateStatus$.subscribe(() => {
      expect(true).toBeTrue();
      done();
    });
    service.triggerValidateDebateStatus();
  });

  it('getCountdown starts at null', (done) => {
    service.getCountdown().subscribe((value) => {
      expect(value).toBeNull();
      done();
    });
  });

  it('getDebateClosedStatus starts at false', (done) => {
    service.getDebateClosedStatus().subscribe((value) => {
      expect(value).toBeFalse();
      done();
    });
  });

  it('connect() aborts without an access token', () => {
    spyOn(console, 'error');
    service.connect(1);
    expect(console.error).toHaveBeenCalledWith(
      'No access token found. WebSocket connection aborted.',
    );
  });

  it('startCountdown/closeDebateManually/disconnect are no-ops without an open socket', () => {
    expect(() => service.startCountdown()).not.toThrow();
    expect(() => service.closeDebateManually()).not.toThrow();
    expect(() => service.disconnect()).not.toThrow();
  });
});
