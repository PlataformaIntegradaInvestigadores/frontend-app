import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Post } from 'src/app/profile/domain/entities/post.interface';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.css']
})
export class PostItemComponent implements OnInit {
  @Input() post!: Post;
  @Input() user: any;
  @Output() deletePost = new EventEmitter<string>();

  menuOpen: boolean = false;
  showConfirmDialog: boolean = false;
  imagePreview: SafeUrl | null = null;
  sortedFiles: any[] = [];

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.sortFiles();
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  confirmDelete() {
    this.showConfirmDialog = true;
  }

  cancelDelete() {
    this.showConfirmDialog = false;
  }

  onDeletePost() {
    this.deletePost.emit(this.post.id);
    this.cancelDelete();
  }

  openImagePreview(imageUrl: string) {
    this.imagePreview = this.sanitizer.bypassSecurityTrustUrl(imageUrl);
  }

  closeImagePreview() {
    this.imagePreview = null;
  }

  sortFiles() {
    this.sortedFiles = this.post.files.slice().sort((a, b) => {
      if (a.file.endsWith('.mp4')) return -1;
      if (b.file.endsWith('.mp4')) return 1;
      if (a.file.endsWith('.jpeg') || a.file.endsWith('.jpg') || a.file.endsWith('.png')) return -1;
      if (b.file.endsWith('.jpeg') || b.file.endsWith('.jpg') || b.file.endsWith('.png')) return 1;
      return 0;
    });
  }
}
