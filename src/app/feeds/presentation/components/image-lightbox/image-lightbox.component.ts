import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-image-lightbox',
  templateUrl: './image-lightbox.component.html',
  styleUrls: ['./image-lightbox.component.css']
})
export class ImageLightboxComponent {
  @Input() showLightbox: boolean = false;
  @Input() imageFiles: any[] = [];
  @Input() currentImageIndex: number = 0;
  
  @Output() close = new EventEmitter<void>();
  @Output() previous = new EventEmitter<void>();
  @Output() next = new EventEmitter<void>();
  @Output() overlayClick = new EventEmitter<Event>();
  @Output() keydown = new EventEmitter<KeyboardEvent>();

  get currentImage(): any {
    return this.imageFiles[this.currentImageIndex];
  }

  onClose(): void {
    this.close.emit();
  }

  onPrevious(): void {
    this.previous.emit();
  }

  onNext(): void {
    this.next.emit();
  }

  onOverlayClick(event: Event): void {
    this.overlayClick.emit(event);
  }

  onKeydown(event: KeyboardEvent): void {
    this.keydown.emit(event);
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
