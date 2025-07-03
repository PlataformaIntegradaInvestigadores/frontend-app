import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FeedPost } from '../../../domain/entities/feed.interface';

@Component({
  selector: 'app-post-editor',
  templateUrl: './post-editor.component.html',
  styleUrls: ['./post-editor.component.css']
})
export class PostEditorComponent implements OnInit, OnChanges {
  @Input() post: FeedPost | null = null;
  @Input() showModal: boolean = false;
  
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<{ content: string, tags: string[] }>();
  
  editedContent: string = '';
  editedTags: string[] = [];
  tagInput: string = '';
  isSubmitting: boolean = false;
  
  ngOnInit(): void {
    console.log('PostEditor ngOnInit: post =', this.post, 'showModal =', this.showModal);
    this.initializeEditor();
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('PostEditor ngOnChanges:', changes);
    if (changes['post'] || changes['showModal']) {
      this.initializeEditor();
    }
  }

  private initializeEditor(): void {
    if (this.post) {
      this.editedContent = this.post.content;
      this.editedTags = [...(this.post.tags || [])];
      console.log('PostEditor initialized with content:', this.editedContent, 'tags:', this.editedTags);
    }
  }

  /**
   * Cierra el modal
   */
  onClose(): void {
    this.close.emit();
  }

  /**
   * Guarda los cambios
   */
  onSave(): void {
    console.log('PostEditor onSave called, content:', this.editedContent, 'isSubmitting:', this.isSubmitting);
    if (this.editedContent.trim() && !this.isSubmitting) {
      this.isSubmitting = true;
      console.log('PostEditor emitting save event');
      this.save.emit({
        content: this.editedContent.trim(),
        tags: this.editedTags
      });
    }
  }

  /**
   * Agrega un tag
   */
  addTag(): void {
    const tag = this.tagInput.trim();
    if (tag && !this.editedTags.includes(tag)) {
      this.editedTags.push(tag);
      this.tagInput = '';
    }
  }

  /**
   * Remueve un tag
   */
  removeTag(index: number): void {
    this.editedTags.splice(index, 1);
  }

  /**
   * Maneja el evento de tecla en el input de tag
   */
  onTagKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.addTag();
    }
  }

  /**
   * Maneja el click en el overlay
   */
  onOverlayClick(event: Event): void {
    if (event.target === event.currentTarget) {
      this.onClose();
    }
  }

  /**
   * Maneja el escape key
   */
  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      this.onClose();
    }
  }
}
