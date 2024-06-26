import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Post } from 'src/app/profile/domain/entities/post.interface';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { User } from 'src/app/profile/domain/entities/user.interfaces';

@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.css']
})
export class PostItemComponent implements OnInit {
  @Input() post!: Post;
  @Input() user!: User;
  @Output() deletePost = new EventEmitter<string>();

  menuOpen: boolean = false;
  showConfirmDialog: boolean = false;
  imagePreview: SafeUrl | null = null;
  sortedFiles: any[] = [];

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.sortFiles();
  }

  /**
   * Alterna la visibilidad del menú de opciones.
   */
  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  /**
   * Muestra el cuadro de diálogo de confirmación de eliminación.
   */
  confirmDelete(): void {
    this.showConfirmDialog = true;
  }

  /**
   * Oculta el cuadro de diálogo de confirmación de eliminación.
   */
  cancelDelete(): void {
    this.showConfirmDialog = false;
  }

  /**
   * Emite el evento de eliminación de la publicación.
   */
  onDeletePost(): void {
    this.deletePost.emit(this.post.id);
    this.cancelDelete();
  }

  /**
   * Abre la previsualización de una imagen.
   * @param imageUrl - La URL de la imagen a previsualizar.
   */
  openImagePreview(imageUrl: string): void {
    this.imagePreview = this.sanitizer.bypassSecurityTrustUrl(imageUrl);
  }

  /**
   * Cierra la previsualización de la imagen.
   */
  closeImagePreview(): void {
    this.imagePreview = null;
  }

  /**
   * Ordena los archivos de la publicación por tipo (videos primero).
   */
  sortFiles(): void {
    this.sortedFiles = this.post.files.slice().sort((a, b) => {
      if (a.file.endsWith('.mp4')) return -1;
      if (b.file.endsWith('.mp4')) return 1;
      if (a.file.endsWith('.jpeg') || a.file.endsWith('.jpg') || a.file.endsWith('.png')) return -1;
      if (b.file.endsWith('.jpeg') || b.file.endsWith('.jpg') || b.file.endsWith('.png')) return 1;
      return 0;
    });
  }
}
