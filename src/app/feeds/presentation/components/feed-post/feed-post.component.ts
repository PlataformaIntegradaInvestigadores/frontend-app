import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FeedPost } from '../../types/post.types';
import { AuthService } from 'src/app/auth/domain/services/auth.service';

@Component({
  selector: 'app-feed-post',
  templateUrl: './feed-post.component.html',
  styleUrls: ['./feed-post.component.css']
})
export class FeedPostComponent implements OnInit {
  @Input() post!: FeedPost;
  @Input() showActions: boolean = true;
  @Input() showComments: boolean = true;
  @Input() allowDelete: boolean = true;
  @Input() allowEdit: boolean = true;
  @Input() currentUserId: string | null = null;
  
  @Output() toggleLike = new EventEmitter<FeedPost>();
  @Output() deletePost = new EventEmitter<string>();
  @Output() sharePost = new EventEmitter<FeedPost>();
  @Output() viewProfile = new EventEmitter<string>();

  showFullContent = false;
  showCommentsSection = false;
  isLiking = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Solo obtener el currentUserId si no se ha pasado como input
    if (this.currentUserId === null) {
      this.currentUserId = this.authService.getCurrentUserId();
    }
  }

  /**
   * Determina si el post puede ser editado/eliminado por el usuario actual
   */
  get canEditPost(): boolean {
    return this.allowEdit && this.allowDelete && this.currentUserId === this.post.author.id;
  }

  /**
   * Formatea la fecha de creación del post
   */
  get formattedDate(): string {
    const now = new Date();
    const postDate = new Date(this.post.created_at);
    const diffMs = now.getTime() - postDate.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Ahora';
    if (diffMins < 60) return `${diffMins}m`;
    if (diffHours < 24) return `${diffHours}h`;
    if (diffDays < 7) return `${diffDays}d`;
    
    return postDate.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'short',
      year: postDate.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
    });
  }

  /**
   * Determina si el contenido debe ser truncado
   */
  get shouldTruncateContent(): boolean {
    return this.post.content.length > 300;
  }

  /**
   * Obtiene el contenido a mostrar (truncado o completo)
   */
  get displayContent(): string {
    if (!this.shouldTruncateContent || this.showFullContent) {
      return this.post.content;
    }
    return this.post.content.substring(0, 300) + '...';
  }

  /**
   * Determina el tipo de archivo para mostrar el icono correcto
   */
  getFileType(file: any): string {
    const extension = file.file.split('.').pop()?.toLowerCase();
    
    if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(extension)) return 'image';
    if (['mp4', 'avi', 'mov', 'wmv'].includes(extension)) return 'video';
    if (['pdf'].includes(extension)) return 'pdf';
    if (['doc', 'docx'].includes(extension)) return 'document';
    if (['xls', 'xlsx'].includes(extension)) return 'spreadsheet';
    
    return 'file';
  }

  /**
   * Obtiene el icono para el tipo de archivo
   */
  getFileIcon(fileType: string): string {
    switch (fileType) {
      case 'image': return 'fas fa-image';
      case 'video': return 'fas fa-video';
      case 'pdf': return 'fas fa-file-pdf';
      case 'document': return 'fas fa-file-word';
      case 'spreadsheet': return 'fas fa-file-excel';
      default: return 'fas fa-file';
    }
  }

  /**
   * Formatea el tamaño del archivo
   */
  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  /**
   * Maneja el click en like
   */
  onLikeClick(): void {
    if (this.isLiking) return;
    
    this.isLiking = true;
    this.toggleLike.emit(this.post);
    
    // Reset flag after a delay to prevent double clicks
    setTimeout(() => {
      this.isLiking = false;
    }, 1000);
  }

  /**
   * Maneja el click en eliminar
   */
  onDeleteClick(): void {
    this.deletePost.emit(this.post.id);
  }

  /**
   * Maneja el click en compartir
   */
  onShareClick(): void {
    this.sharePost.emit(this.post);
  }

  /**
   * Toggle para mostrar contenido completo
   */
  toggleFullContent(): void {
    this.showFullContent = !this.showFullContent;
  }

  /**
   * Toggle para mostrar comentarios
   */
  toggleComments(): void {
    this.showCommentsSection = !this.showCommentsSection;
  }

  /**
   * Navega al perfil del autor
   */
  navigateToProfile(): void {
    this.viewProfile.emit(this.post.author.id);
  }

  /**
   * Abre el archivo en una nueva ventana
   */
  openFile(file: any): void {
    window.open(file.file, '_blank');
  }

  /**
   * Descarga el archivo
   */
  downloadFile(file: any): void {
    const link = document.createElement('a');
    link.href = file.file;
    link.download = file.file.split('/').pop() || 'download';
    link.click();
  }
}
