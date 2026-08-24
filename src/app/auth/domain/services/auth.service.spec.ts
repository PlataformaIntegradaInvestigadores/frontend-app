import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { CompanyAuthService } from './company-auth.service';
import { AuthResponse, MfaChallengeResponse } from '../entities/interfaces';
import { environment } from 'src/environments/environment';

function makeJwt(payload: Record<string, unknown>): string {
  const header = btoa(JSON.stringify({ alg: 'none', typ: 'JWT' }));
  const body = btoa(JSON.stringify(payload));
  return `${header}.${body}.signature`;
}

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  const apiUrl = environment.apiIdentity;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthService,
        { provide: CompanyAuthService, useValue: { register: jasmine.createSpy('register') } },
      ],
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('isLoggedIn / isTokenExpired', () => {
    it('returns false when no token stored', () => {
      expect(service.isLoggedIn()).toBeFalse();
    });

    it('returns false (expired) for a malformed token', () => {
      expect(service.isTokenExpired('not-a-jwt')).toBeTrue();
    });

    it('returns true when token exp is in the past', () => {
      const token = makeJwt({ exp: Math.floor(Date.now() / 1000) - 100 });
      localStorage.setItem('accessToken', token);
      expect(service.isLoggedIn()).toBeFalse();
      expect(service.isTokenExpired(token)).toBeTrue();
    });

    it('returns true (logged in) when token exp is in the future', () => {
      const token = makeJwt({ exp: Math.floor(Date.now() / 1000) + 3600 });
      localStorage.setItem('accessToken', token);
      expect(service.isLoggedIn()).toBeTrue();
      expect(service.isTokenExpired(token)).toBeFalse();
    });
  });

  describe('getTokenExpirationTime', () => {
    it('returns 0 when no token stored', () => {
      expect(service.getTokenExpirationTime()).toBe(0);
    });

    it('returns 0 for an undecodable token', () => {
      localStorage.setItem('accessToken', 'garbage');
      expect(service.getTokenExpirationTime()).toBe(0);
    });

    it('returns remaining seconds for a valid future token', () => {
      const token = makeJwt({ exp: Math.floor(Date.now() / 1000) + 500 });
      localStorage.setItem('accessToken', token);
      const remaining = service.getTokenExpirationTime();
      expect(remaining).toBeGreaterThan(0);
      expect(remaining).toBeLessThanOrEqual(500);
    });

    it('returns 0 (clamped) for an already-expired token', () => {
      const token = makeJwt({ exp: Math.floor(Date.now() / 1000) - 500 });
      localStorage.setItem('accessToken', token);
      expect(service.getTokenExpirationTime()).toBe(0);
    });
  });

  describe('getUserType / isUser / isCompany', () => {
    it('defaults to null when nothing stored', () => {
      expect(service.getUserType()).toBeNull();
      expect(service.isUser()).toBeFalse();
      expect(service.isCompany()).toBeFalse();
    });

    it('reads userType from localStorage', () => {
      localStorage.setItem('userType', 'company');
      expect(service.getUserType()).toBe('company');
      expect(service.isCompany()).toBeTrue();
      expect(service.isUser()).toBeFalse();
    });
  });

  describe('getUserId / getCompanyId / getCurrentUserId', () => {
    it('returns null when nothing stored', () => {
      expect(service.getUserId()).toBeNull();
      expect(service.getCompanyId()).toBeNull();
      expect(service.getCurrentUserId()).toBeNull();
    });

    it('resolves current id based on user type', () => {
      localStorage.setItem('userType', 'user');
      localStorage.setItem('userId', 'u-1');
      localStorage.setItem('companyId', 'c-1');
      expect(service.getCurrentUserId()).toBe('u-1');

      localStorage.setItem('userType', 'company');
      expect(service.getCurrentUserId()).toBe('c-1');
    });
  });

  describe('login', () => {
    it('stores session on a successful user login', () => {
      const token = makeJwt({ exp: Math.floor(Date.now() / 1000) + 3600, user_id: 'u-42' });
      const response: AuthResponse = { access: token, user_id: 'u-42' };

      service.login({ username: 'a', password: 'b' }, 'user').subscribe((res) => {
        expect(res).toEqual(response);
      });

      const req = httpMock.expectOne(`${apiUrl}/token/`);
      expect(req.request.method).toBe('POST');
      req.flush(response);

      expect(localStorage.getItem('accessToken')).toBe(token);
      expect(localStorage.getItem('userType')).toBe('user');
      expect(localStorage.getItem('userId')).toBe('u-42');
    });

    it('hits the companies endpoint for company login', () => {
      service.login({ username: 'a', password: 'b' }, 'company').subscribe((res) => {
        expect((res as AuthResponse).access).toBeTruthy();
      });
      const req = httpMock.expectOne(`${apiUrl}/companies/token/`);
      req.flush({ access: makeJwt({ exp: Math.floor(Date.now() / 1000) + 3600 }) } as AuthResponse);
    });

    it('does not persist a session when an MFA challenge is returned', () => {
      const mfaResponse: MfaChallengeResponse = {
        status: 'mfa_required',
        mfa_challenge: 'chal-1',
        expires_in: 300,
      };

      service.login({ username: 'a', password: 'b' }).subscribe((res) => {
        expect(res).toEqual(mfaResponse);
      });

      const req = httpMock.expectOne(`${apiUrl}/token/`);
      req.flush(mfaResponse);

      expect(localStorage.getItem('accessToken')).toBeNull();
    });

    it('propagates a formatted error on failed login', (done) => {
      service.login({ username: 'a', password: 'b' }).subscribe({
        error: (err: Error) => {
          expect(err.message).toContain('Invalid credentials');
          done();
        },
      });

      const req = httpMock.expectOne(`${apiUrl}/token/`);
      req.flush({ detail: 'Invalid credentials' }, { status: 401, statusText: 'Unauthorized' });
    });
  });

  describe('logout / clearLocalSession', () => {
    it('clears storage and preserves dontShowOnboarding', () => {
      localStorage.setItem('accessToken', 'tok');
      localStorage.setItem('dontShowOnboarding', 'true');

      service.logout();
      const req = httpMock.expectOne(`${apiUrl}/logout/`);
      req.flush({});

      expect(localStorage.getItem('accessToken')).toBeNull();
      expect(localStorage.getItem('dontShowOnboarding')).toBe('true');
    });

    it('still clears local session if the logout request fails', () => {
      localStorage.setItem('accessToken', 'tok');

      service.logout();
      const req = httpMock.expectOne(`${apiUrl}/logout/`);
      req.flush('server error', { status: 500, statusText: 'Server Error' });

      expect(localStorage.getItem('accessToken')).toBeNull();
    });
  });

  describe('refreshToken', () => {
    it('stores new access token on success', () => {
      const newToken = makeJwt({ exp: Math.floor(Date.now() / 1000) + 3600 });
      service.refreshToken().subscribe((res) => {
        expect(res.access).toBe(newToken);
      });

      const req = httpMock.expectOne(`${apiUrl}/token/refresh/`);
      req.flush({ access: newToken } as AuthResponse);

      expect(localStorage.getItem('accessToken')).toBe(newToken);
    });

    it('clears the local session on refresh failure', (done) => {
      localStorage.setItem('accessToken', 'stale');

      service.refreshToken().subscribe({
        error: () => {
          expect(localStorage.getItem('accessToken')).toBeNull();
          done();
        },
      });

      const req = httpMock.expectOne(`${apiUrl}/token/refresh/`);
      req.flush('nope', { status: 401, statusText: 'Unauthorized' });
    });
  });

  describe('getUsers', () => {
    it('returns an empty list without hitting the API when not logged in', (done) => {
      service.getUsers().subscribe((users) => {
        expect(users).toEqual([]);
        done();
      });
      httpMock.expectNone(`${apiUrl}/users/`);
    });

    it('swallows 401/403 responses as an empty list', (done) => {
      const token = makeJwt({ exp: Math.floor(Date.now() / 1000) + 3600 });
      localStorage.setItem('accessToken', token);

      service.getUsers().subscribe((users) => {
        expect(users).toEqual([]);
        done();
      });

      const req = httpMock.expectOne(`${apiUrl}/users/`);
      req.flush('forbidden', { status: 403, statusText: 'Forbidden' });
    });
  });

  describe('updateUser', () => {
    it('errors immediately when there is no user id', (done) => {
      service.updateUser(new FormData()).subscribe({
        error: (err: Error) => {
          expect(err.message).toBe('User ID not found');
          done();
        },
      });
    });

    it('sends a PUT to the correct user id', () => {
      localStorage.setItem('userId', 'u-9');
      service.updateUser(new FormData()).subscribe();
      const req = httpMock.expectOne(`${apiUrl}/users/u-9/update/`);
      expect(req.request.method).toBe('PUT');
      req.flush({});
    });
  });
});
