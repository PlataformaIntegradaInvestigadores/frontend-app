import { Component, Input, OnInit } from '@angular/core';
import { Post } from 'src/app/profile/domain/entities/post.interface';
import { AuthService } from 'src/app/auth/domain/services/auth.service';
import { PostService } from 'src/app/profile/domain/services/post.service';
import { User } from 'src/app/profile/domain/entities/user.interfaces';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  @Input() user: User | null = null;
  posts: Post[] = [];
  isLoggedIn: boolean = false;
  isLoading: boolean = false;
  error: string | null = null;
  success: string | null = null;

  constructor(
    private postService: PostService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    if (this.user && this.user.id) {
      this.loadPosts(this.user.id);
    }
    this.isLoggedIn = this.authService.isLoggedIn();
  }

  /**
   * Carga las publicaciones de un usuario específico.
   * @param userId - El ID del usuario.
   */
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

  /**
   * Crea una nueva publicación.
   * @param newPost - Los datos de la nueva publicación.
   */
  createPost(newPost: { description: string, files: File[], created_at: string }): void {
    this.isLoading = true;
    this.error = null;
    this.success = null;

    const formData = new FormData();
    formData.append('description', newPost.description);
    formData.append('created_at', newPost.created_at);
    newPost.files.forEach((file: File) => {
        formData.append('files', file, file.name);
    });

    // Log para verificar el contenido de formData
    formData.forEach((value, key) => {
        console.log(key + ': ', value);
    });

    this.postService.createPost(formData).subscribe(
        response => {
            console.log('Post created:', response);
            this.posts.push(response);
            this.isLoading = false;
            this.success = 'Post created successfully!';
            this.loadPosts(this.user!.id!);  // Recargar publicaciones
            setTimeout(() => {
                this.success = null;
            }, 3000);
        },
        error => {
            console.error('Error creating post:', error);
            this.error = 'Failed to create post';
            this.isLoading = false;
        }
    );
}


  /**
   * Elimina una publicación específica.
   * @param postId - El ID de la publicación a eliminar.
   */
  deletePost(postId: string): void {
    this.isLoading = true;
    this.postService.deletePost(postId).subscribe(
      () => {
        this.posts = this.posts.filter(post => post.id !== postId);
        this.isLoading = false;
        this.success = 'Post deleted successfully!';
        setTimeout(() => {
          this.success = null;
        }, 3000);
      },
      error => {
        console.error('Error deleting post:', error);
        this.error = 'Failed to delete post';
        this.isLoading = false;
      }
    );
  }
}
