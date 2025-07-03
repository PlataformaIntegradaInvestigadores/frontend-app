import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Routing
import { FeedsRoutingModule } from './feeds-routing.module';

// Components
import { FeedPageComponent } from './presentation/pages/feed-page.component';
import { FeedPostComponent } from './presentation/components/feed-post/feed-post.component';
import { PostCommentsComponent } from './presentation/components/post-comments/post-comments.component';
import { PostCreatorComponent } from './presentation/components/post-creator/post-creator.component';
import { PostListComponent } from './presentation/components/post-list/post-list.component';

// Feed Post Subcomponents
import { PostHeaderComponent } from './presentation/components/post-header/post-header.component';
import { PostContentComponent } from './presentation/components/post-content/post-content.component';
import { PostPollComponent } from './presentation/components/post-poll/post-poll.component';
import { PostFilesComponent } from './presentation/components/post-files/post-files.component';
import { PostActionsComponent } from './presentation/components/post-actions/post-actions.component';
import { ImageLightboxComponent } from './presentation/components/image-lightbox/image-lightbox.component';

// Services
import { FeedService } from './domain/services/feed.service';

// Shared Module
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    FeedPageComponent,
    FeedPostComponent,
    PostCommentsComponent,
    PostCreatorComponent,
    PostListComponent,
    // Feed Post Subcomponents
    PostHeaderComponent,
    PostContentComponent,
    PostPollComponent,
    PostFilesComponent,
    PostActionsComponent,
    ImageLightboxComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    FeedsRoutingModule,
    SharedModule
  ],
  exports: [
    FeedPostComponent,
    PostCommentsComponent,
    PostCreatorComponent,
    PostListComponent
  ],
  providers: [
    FeedService
  ]
})
export class FeedsModule { }
