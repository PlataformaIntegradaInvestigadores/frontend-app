// Exportaciones públicas del módulo feeds
export { FeedsModule } from './feeds.module';

// Componentes exportables
export { PostCreatorComponent } from './presentation/components/post-creator/post-creator.component';
export { PostListComponent } from './presentation/components/post-list/post-list.component';
export { FeedPostComponent } from './presentation/components/feed-post/feed-post.component';
export { PostCommentsComponent } from './presentation/components/post-comments/post-comments.component';

// Tipos e interfaces
export * from './presentation/types/post.types';
export * from './domain/entities/feed.interface';

// Servicios
export { FeedService } from './domain/services/feed.service';
