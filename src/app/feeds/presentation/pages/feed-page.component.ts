import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, takeUntil, finalize } from 'rxjs';
import { FeedService } from '../../domain/services/feed.service';
import { 
  FeedPost, 
  FeedResponse, 
  FeedFilters, 
  CreatePostData,
  UserFeedStats 
} from '../../domain/entities/feed.interface';
import { PostCreatorData } from '../types/post.types';

@Component({
  selector: 'app-feed-page',
  templateUrl: './feed-page.component.html',
  styleUrls: ['./feed-page.component.css']
})
export class FeedPageComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  
  // Data
  posts: FeedPost[] = [];
  userStats: UserFeedStats | null = null;
  
  // State
  isLoading = false;
  isLoadingMore = false;
  isSubmittingPost = false;
  hasMore = false;
  nextCursor: string | null = null;
  error: string | null = null;
  selectedFilter: 'personalized' | 'trending' | 'latest' = 'personalized';
  
  // UI State
  searchQuery = '';
  selectedTags: string[] = [];

  // Exponer Math para el template
  Math = Math;

  constructor(private feedService: FeedService) { }

  ngOnInit(): void {
    console.log('FeedPageComponent: Inicializando componente');
    this.loadFeed();
    this.loadUserStats();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Carga el feed inicial
   */
  loadFeed(): void {
    console.log('FeedPageComponent: Iniciando carga de feed');
    this.isLoading = true;
    this.error = null;
    this.posts = [];
    this.nextCursor = null;

    const filters: FeedFilters = {
      feed_type: this.selectedFilter,
      limit: 20
    };

    console.log('FeedPageComponent: Enviando request con filtros:', filters);

    this.feedService.getFeed(filters)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => {
          console.log('FeedPageComponent: Finalizando carga, isLoading = false');
          this.isLoading = false;
        })
      )
      .subscribe({
        next: (response: FeedResponse) => {
          console.log('FeedPageComponent: Respuesta recibida:', response);
          this.posts = response.posts;
          this.hasMore = response.has_next;
          this.nextCursor = response.next_cursor || null;
          console.log('FeedPageComponent: Posts cargados:', this.posts.length);
        },
        error: (error) => {
          console.error('FeedPageComponent: Error loading feed:', error);
          this.error = 'No se pudo cargar el feed. Intenta de nuevo.';
        }
      });
  }

  /**
   * Carga más posts (scroll infinito)
   */
  loadMorePosts(): void {
    if (!this.hasMore || this.isLoadingMore || !this.nextCursor) return;

    this.isLoadingMore = true;

    const filters: FeedFilters = {
      feed_type: this.selectedFilter,
      cursor: this.nextCursor,
      limit: 20
    };

    this.feedService.getFeed(filters)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => this.isLoadingMore = false)
      )
      .subscribe({
        next: (response: FeedResponse) => {
          this.posts = [...this.posts, ...response.posts];
          this.hasMore = response.has_next;
          this.nextCursor = response.next_cursor || null;
        },
        error: (error) => {
          console.error('Error loading more posts:', error);
        }
      });
  }

  /**
   * Carga las estadísticas del usuario
   */
  loadUserStats(): void {
    this.feedService.getUserFeedStats()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (stats) => {
          this.userStats = stats;
        },
        error: (error) => {
          console.error('Error loading user stats:', error);
        }
      });
  }

  /**
   * Cambia el filtro del feed
   */
  onFilterChange(filter: 'personalized' | 'trending' | 'latest'): void {
    if (this.selectedFilter !== filter) {
      this.selectedFilter = filter;
      this.loadFeed();
    }
  }

  /**
   * Maneja el like/unlike de un post
   */
  onToggleLike(post: FeedPost): void {
    this.feedService.toggleLikePost(post.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          // Actualizar el post en la lista
          const index = this.posts.findIndex(p => p.id === post.id);
          if (index !== -1) {
            this.posts[index] = {
              ...this.posts[index],
              is_liked: response.liked,
              likes_count: response.likes_count
            };
          }
        },
        error: (error) => {
          console.error('Error toggling like:', error);
        }
      });
  }

  /**
   * Maneja la eliminación de un post
   */
  onDeletePost(postId: string): void {
    if (confirm('¿Estás seguro de que quieres eliminar este post?')) {
      this.feedService.deletePost(postId)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            // Remover el post de la lista
            this.posts = this.posts.filter(p => p.id !== postId);
            this.loadUserStats();
          },
          error: (error) => {
            console.error('Error deleting post:', error);
            this.error = 'No se pudo eliminar el post. Intenta de nuevo.';
          }
        });
    }
  }

  /**
   * Busca posts
   */
  onSearch(): void {
    if (!this.searchQuery.trim()) {
      this.loadFeed();
      return;
    }

    this.isLoading = true;
    this.error = null;

    this.feedService.searchPosts(this.searchQuery, this.selectedTags)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => this.isLoading = false)
      )
      .subscribe({
        next: (posts) => {
          this.posts = posts;
          this.hasMore = false;
          this.nextCursor = null;
        },
        error: (error) => {
          console.error('Error searching posts:', error);
          this.error = 'No se pudo realizar la búsqueda. Intenta de nuevo.';
        }
      });
  }

  /**
   * Limpia la búsqueda
   */
  clearSearch(): void {
    this.searchQuery = '';
    this.selectedTags = [];
    this.loadFeed();
  }

  /**
   * Refresca el feed
   */
  refreshFeed(): void {
    this.loadFeed();
    this.loadUserStats();
  }

  /**
   * Maneja el scroll para cargar más posts
   */
  onScroll(): void {
    const threshold = 100;
    const position = window.pageYOffset + window.innerHeight;
    const height = document.documentElement.scrollHeight;

    if (position > height - threshold) {
      this.loadMorePosts();
    }
  }

  /**
   * Enfoca el input de post (para el botón de crear primer post)
   */
  focusPostInput(): void {
    // Scroll hacia arriba y enfocar el textarea del componente post-creator
    setTimeout(() => {
      const textarea = document.querySelector('app-post-creator textarea') as HTMLTextAreaElement;
      if (textarea) {
        textarea.focus();
        textarea.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
  }

  /**
   * Maneja el envío de post desde el componente PostCreator
   */
  onPostSubmitted(postData: PostCreatorData): void {
    this.isSubmittingPost = true;

    const createPostData: CreatePostData = {
      content: postData.content,
      tags: postData.tags,
      files: postData.files,
      is_public: true  // Todos los posts serán públicos por defecto
    };

    this.feedService.createPost(createPostData)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => this.isSubmittingPost = false)
      )
      .subscribe({
        next: (newPost) => {
          this.posts = [newPost, ...this.posts];
          this.loadUserStats();
        },
        error: (error) => {
          console.error('Error creando post:', error);
          this.error = 'No se pudo crear el post. Intenta de nuevo.';
        }
      });
  }

  /**
   * Remueve un tag de la búsqueda
   */
  removeTag(index: number): void {
    this.selectedTags.splice(index, 1);
    this.loadFeed();
  }

  /**
   * TrackBy function para optimizar el rendering de la lista de posts
   */
  trackByPostId(index: number, post: FeedPost): string {
    return post.id;
  }
}
