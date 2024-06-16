import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/profile/domain/entities/post.interface';
import { PostService } from 'src/app/profile/domain/entities/post.service';
import { UserDataService } from 'src/app/profile/domain/entities/user_data.service';
import { AuthService } from 'src/app/auth/domain/entities/auth.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  posts: Post[] = [];
  user: any;
  isLoggedIn: boolean = false;
  isLoading: boolean = false;
  error: string | null = null;
  success: string | null = null;

  constructor(
    private postService: PostService,
    private userDataService: UserDataService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.userDataService.getUser().subscribe(user => {
      this.user = user;
      if (this.user) {
        this.loadPosts(this.user.user_id);
      }
    });

    this.isLoggedIn = this.authService.isLoggedIn();
  }

  loadPosts(userId: string): void {
    this.isLoading = true;
    this.postService.getPosts(userId).subscribe(
      posts => {
        this.posts = posts;
        this.isLoading = false;
      },
      error => {
        console.error('Error loading posts:', error);
        this.error = 'Failed to load posts';
        this.isLoading = false;
      }
    );
  }

  createPost(newPost: any) {
    this.isLoading = true;
    this.error = null;
    this.success = null;

    const formData = new FormData();
    formData.append('description', newPost.description);
    formData.append('created_at', newPost.created_at);
    newPost.files.forEach((file: File) => {
      formData.append('files', file, file.name);
    });

    this.postService.createPost(formData).subscribe(
      response => {
        this.posts.push(response);
        this.isLoading = false;
        this.success = 'Post created successfully!';
        this.loadPosts(this.user.user_id);  // Recargar publicaciones
      },
      error => {
        console.error('Error creating post:', error);
        this.error = 'Failed to create post';
        this.isLoading = false;
      }
    );
  }

  deletePost(postId: string) {
    this.isLoading = true;
    this.postService.deletePost(postId).subscribe(
      () => {
        this.posts = this.posts.filter(post => post.id !== postId);
        this.isLoading = false;
      },
      error => {
        console.error('Error deleting post:', error);
        this.error = 'Failed to delete post';
        this.isLoading = false;
      }
    );
  }
}
