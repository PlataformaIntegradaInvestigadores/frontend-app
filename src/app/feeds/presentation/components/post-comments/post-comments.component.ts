import { Component, Input, OnInit } from '@angular/core';

interface Comment {
  id: string;
  content: string;
  created_at: string;
  author: {
    id: string;
    first_name: string;
    last_name: string;
    profile_picture?: string;
  };
}

@Component({
  selector: 'app-post-comments',
  templateUrl: './post-comments.component.html',
  styleUrls: ['./post-comments.component.css']
})
export class PostCommentsComponent implements OnInit {
  @Input() postId!: string;
  @Input() commentsCount: number = 0;

  comments: Comment[] = [];
  newCommentContent = '';
  isLoadingComments = false;
  isSubmittingComment = false;

  ngOnInit(): void {
    // For now, we'll use mock data
    this.loadMockComments();
  }

  /**
   * Load mock comments for demonstration
   */
  loadMockComments(): void {
    // Mock comments data
    this.comments = [
      {
        id: '1',
        content: 'This is a great post! Thanks for sharing.',
        created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
        author: {
          id: '1',
          first_name: 'John',
          last_name: 'Doe',
          profile_picture: '/assets/profile.png'
        }
      },
      {
        id: '2',
        content: 'I completely agree with your perspective on this topic.',
        created_at: new Date(Date.now() - 30 * 60 * 1000).toISOString(), // 30 minutes ago
        author: {
          id: '2',
          first_name: 'Jane',
          last_name: 'Smith',
          profile_picture: '/assets/profile.png'
        }
      }
    ];
  }

  /**
   * Submit a new comment
   */
  onSubmitComment(): void {
    if (!this.newCommentContent.trim() || this.isSubmittingComment) {
      return;
    }

    this.isSubmittingComment = true;

    // Simulate API call
    setTimeout(() => {
      const newComment: Comment = {
        id: Date.now().toString(),
        content: this.newCommentContent.trim(),
        created_at: new Date().toISOString(),
        author: {
          id: 'current-user',
          first_name: 'You',
          last_name: '',
          profile_picture: '/assets/profile.png'
        }
      };

      this.comments.push(newComment);
      this.newCommentContent = '';
      this.isSubmittingComment = false;
      this.commentsCount = this.comments.length;
    }, 1000);
  }

  /**
   * Get time ago string
   */
  getTimeAgo(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));

    if (diffInMinutes < 1) {
      return 'just now';
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes}m`;
    } else if (diffInMinutes < 1440) {
      const hours = Math.floor(diffInMinutes / 60);
      return `${hours}h`;
    } else {
      const days = Math.floor(diffInMinutes / 1440);
      return `${days}d`;
    }
  }
}
