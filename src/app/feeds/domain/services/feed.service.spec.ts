import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FeedService } from './feed.service';
import { environment } from 'src/environments/environment';
import { FeedPost, FeedResponse } from '../entities/feed.interface';

describe('FeedService', () => {
  let service: FeedService;
  let httpMock: HttpTestingController;
  const apiUrl = `${environment.apiSocial}/v1`;

  const rawPost = {
    id: 'p-1',
    content: 'hello',
    tags: [],
    is_public: true,
    author: { id: 'u-1' },
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-02T00:00:00Z',
    likes_count: 0,
    comments_count: 0,
    files: [{ id: 'f-1', uploaded_at: '2024-01-01T00:00:00Z' }],
  } as any;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FeedService],
    });
    service = TestBed.inject(FeedService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getFeed', () => {
    it('builds no query params without filters and converts post dates', (done) => {
      service.getFeed().subscribe((res: FeedResponse) => {
        expect(res.posts[0].created_at instanceof Date).toBeTrue();
        expect(res.posts[0].files![0].uploaded_at instanceof Date).toBeTrue();
        done();
      });
      const req = httpMock.expectOne(
        (r) => r.url === `${apiUrl}/feed/` && r.params.keys().length === 0,
      );
      req.flush({ posts: [rawPost], has_next: false, total_count: 1 });
    });

    it('applies every filter as a query param', () => {
      service
        .getFeed({
          feed_type: 'trending',
          tags: ['a', 'b'],
          author: 'u-1',
          time_range: 'week',
          cursor: 'c-1',
          limit: 5,
        })
        .subscribe();

      const req = httpMock.expectOne(
        (r) => r.url === `${apiUrl}/feed/` && r.params.get('type') === 'trending',
      );
      expect(req.request.params.get('tags')).toBe('a,b');
      expect(req.request.params.get('author')).toBe('u-1');
      expect(req.request.params.get('time_range')).toBe('week');
      expect(req.request.params.get('cursor')).toBe('c-1');
      expect(req.request.params.get('limit')).toBe('5');
      req.flush({ posts: [], has_next: false, total_count: 0 });
    });
  });

  it('getFilteredFeed POSTs the filters', () => {
    service.getFilteredFeed({ feed_type: 'latest' }).subscribe();
    const req = httpMock.expectOne(`${apiUrl}/feed/`);
    expect(req.request.method).toBe('POST');
    req.flush({ posts: [], has_next: false, total_count: 0 });
  });

  it('createPost builds FormData with defaults and optional fields', () => {
    service
      .createPost({
        content: 'hi',
        tags: ['x'],
        files: [new File(['a'], 'a.txt')],
        poll_data: { question: 'Q?', options: ['a', 'b'] },
      })
      .subscribe();

    const req = httpMock.expectOne(`${apiUrl}/posts/`);
    const body = req.request.body as FormData;
    expect(body.get('content')).toBe('hi');
    expect(body.get('tags')).toBe('x');
    expect(body.get('is_public')).toBe('true');
    expect(body.get('poll_data')).toContain('Q?');
    req.flush(rawPost);
  });

  it('createPost respects an explicit is_public: false', () => {
    service.createPost({ content: 'hi', is_public: false }).subscribe();
    const req = httpMock.expectOne(`${apiUrl}/posts/`);
    expect((req.request.body as FormData).get('is_public')).toBe('false');
    req.flush(rawPost);
  });

  it('getPost converts dates on the returned post', (done) => {
    service.getPost('p-1').subscribe((post: FeedPost) => {
      expect(post.created_at instanceof Date).toBeTrue();
      done();
    });
    httpMock.expectOne(`${apiUrl}/posts/p-1/`).flush(rawPost);
  });

  it('deletePost DELETEs the post', () => {
    service.deletePost('p-1').subscribe();
    const req = httpMock.expectOne(`${apiUrl}/posts/p-1/`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });

  describe('searchPosts', () => {
    it('falls back to non-vector search on a non-404 vector-search failure', (done) => {
      service.searchPosts('ai', ['t1'], 'u-1', true).subscribe((posts) => {
        expect(posts).toEqual([]);
        done();
      });

      const first = httpMock.expectOne((r) => r.params.get('vector') === 'true');
      first.flush('err', { status: 500, statusText: 'Server Error' });

      const fallback = httpMock.expectOne((r) => r.params.get('vector') === 'false');
      fallback.flush([]);
    });

    it('does not fall back and propagates on a 404', (done) => {
      service.searchPosts('ai').subscribe({
        error: (err: any) => {
          expect(err.status).toBe(404);
          done();
        },
      });
      const req = httpMock.expectOne((r) => r.params.get('vector') === 'true');
      req.flush('not found', { status: 404, statusText: 'Not Found' });
    });
  });

  it('toggleLikePost POSTs to the like endpoint', () => {
    service.toggleLikePost('p-1').subscribe();
    const req = httpMock.expectOne(`${apiUrl}/posts/p-1/like/`);
    expect(req.request.method).toBe('POST');
    req.flush({ liked: true, likes_count: 1 });
  });

  it('createComment includes parent_comment only when provided', () => {
    service.createComment('p-1', 'nice', 'c-0').subscribe();
    const req = httpMock.expectOne(`${apiUrl}/posts/p-1/comments/`);
    expect(req.request.body).toEqual({ content: 'nice', parent_comment: 'c-0' });
    req.flush({
      id: 'c-1',
      content: 'nice',
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z',
    });
  });

  it('votePoll POSTs the selected option ids', () => {
    service.votePoll('poll-1', ['opt-1']).subscribe();
    const req = httpMock.expectOne(`${apiUrl}/polls/poll-1/vote/`);
    expect(req.request.body).toEqual({ option_ids: ['opt-1'] });
    req.flush({});
  });

  it('votePoll propagates errors through catchError', (done) => {
    spyOn(console, 'error');
    service.votePoll('poll-1', ['opt-1']).subscribe({
      error: (err: any) => {
        expect(err.status).toBe(400);
        done();
      },
    });
    httpMock.expectOne(`${apiUrl}/polls/poll-1/vote/`).flush('bad', {
      status: 400,
      statusText: 'Bad Request',
    });
  });

  describe('getFriendlyErrorMessage', () => {
    it('returns the fallback when there is no error', () => {
      expect(service.getFriendlyErrorMessage(null)).toBe(
        'No se pudo completar la acción. Intenta de nuevo.',
      );
    });

    it('detects a connectivity failure (status 0)', () => {
      expect(service.getFriendlyErrorMessage({ status: 0 })).toContain('No hay conexión');
    });

    it('detects an empty-content validation error', () => {
      const msg = service.getFriendlyErrorMessage({
        error: { detail: 'Content cannot be empty' },
      });
      expect(msg).toBe('Escribe una descripción antes de publicar.');
    });

    it('detects a content-blank validation error', () => {
      const msg = service.getFriendlyErrorMessage({
        error: { detail: 'content must not be blank' },
      });
      expect(msg).toBe('Escribe una descripción antes de publicar.');
    });

    it('detects a max-length (5000) error', () => {
      const msg = service.getFriendlyErrorMessage({
        error: { detail: 'Ensure this field has no more than 5000 characters' },
      });
      expect(msg).toBe('La descripción no puede superar los 5000 caracteres.');
    });

    it('detects an oversized-file error', () => {
      const msg = service.getFriendlyErrorMessage({ error: { detail: 'File size exceeds 10MB' } });
      expect(msg).toContain('archivos supera el tamaño');
    });

    it('detects a too-many-files error', () => {
      const msg = service.getFriendlyErrorMessage({
        error: { detail: 'You cannot attach more than 10 files' },
      });
      expect(msg).toBe('Puedes adjuntar hasta 10 archivos por publicación.');
    });

    it('detects a permission error by message', () => {
      const msg = service.getFriendlyErrorMessage({ error: { detail: 'permission denied' } });
      expect(msg).toBe('No tienes permisos para realizar esta acción.');
    });

    it('detects a permission error by status 403', () => {
      const msg = service.getFriendlyErrorMessage({ status: 403, error: {} });
      expect(msg).toBe('No tienes permisos para realizar esta acción.');
    });

    it('detects an expired-session error (401)', () => {
      const msg = service.getFriendlyErrorMessage({ status: 401 });
      expect(msg).toBe('Tu sesión expiró. Inicia sesión nuevamente.');
    });

    it('returns the raw server message when nothing else matches', () => {
      const msg = service.getFriendlyErrorMessage({ error: { detail: 'Something unusual' } });
      expect(msg).toBe('Something unusual');
    });

    it('falls back when the extracted message is the literal [object Object]', () => {
      const msg = service.getFriendlyErrorMessage({ error: {} });
      expect(msg).toBe('No se pudo completar la acción. Intenta de nuevo.');
    });

    it('joins nested field-error arrays recursively', () => {
      const msg = service.getFriendlyErrorMessage({
        error: { content: ['too many 5000 chars'] },
      });
      expect(msg).toBe('La descripción no puede superar los 5000 caracteres.');
    });

    it('falls back to error.message when the payload has no usable shape', () => {
      const msg = service.getFriendlyErrorMessage({ error: null, message: 'network down' });
      expect(msg).toBe('network down');
    });

    it('accepts a custom fallback', () => {
      expect(service.getFriendlyErrorMessage(undefined, 'custom fallback')).toBe(
        'custom fallback',
      );
    });
  });
});
