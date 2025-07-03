import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-post-files',
  templateUrl: './post-files.component.html',
  styleUrls: ['./post-files.component.css']
})
export class PostFilesComponent {
  @Input() files: any[] = [];
  
  @Output() imageClick = new EventEmitter<any>();
  @Output() fileOpen = new EventEmitter<any>();
  @Output() fileDownload = new EventEmitter<any>();

  onImageClick(file: any): void {
    this.imageClick.emit(file);
  }

  onFileOpen(file: any): void {
    this.fileOpen.emit(file);
  }

  onFileDownload(file: any): void {
    this.fileDownload.emit(file);
  }

  getFileType(file: any): string {
    if (!file.file) return 'other';
    
    const url = file.file.toLowerCase();
    if (url.includes('.jpg') || url.includes('.jpeg') || url.includes('.png') || url.includes('.gif') || url.includes('.webp')) {
      return 'image';
    } else if (url.includes('.mp4') || url.includes('.avi') || url.includes('.mov') || url.includes('.wmv')) {
      return 'video';
    } else if (url.includes('.pdf')) {
      return 'pdf';
    } else if (url.includes('.doc') || url.includes('.docx')) {
      return 'document';
    } else if (url.includes('.zip') || url.includes('.rar')) {
      return 'archive';
    } else {
      return 'other';
    }
  }

  getFileIcon(fileType: string): string {
    switch (fileType) {
      case 'pdf':
        return 'fas fa-file-pdf';
      case 'document':
        return 'fas fa-file-word';
      case 'archive':
        return 'fas fa-file-archive';
      default:
        return 'fas fa-file';
    }
  }

  formatFileSize(size: number): string {
    if (!size) return '';
    
    const units = ['B', 'KB', 'MB', 'GB'];
    let unitIndex = 0;
    let fileSize = size;
    
    while (fileSize >= 1024 && unitIndex < units.length - 1) {
      fileSize /= 1024;
      unitIndex++;
    }
    
    return `${fileSize.toFixed(1)} ${units[unitIndex]}`;
  }
}
