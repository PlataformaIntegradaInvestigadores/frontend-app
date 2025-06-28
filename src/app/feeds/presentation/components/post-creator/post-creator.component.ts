import { Component, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { PostCreatorData } from '../../types/post.types';

@Component({
  selector: 'app-post-creator',
  templateUrl: './post-creator.component.html',
  styleUrls: ['./post-creator.component.css']
})
export class PostCreatorComponent {
  @Input() placeholder: string = "What's on your mind?";
  @Input() buttonText: string = 'Post';
  @Input() showOptions: boolean = true;
  @Input() userAvatar: string = '/assets/profile.png';
  @Input() userName: string = '';
  @Input() isLoading: boolean = false;
  
  @Output() postSubmitted = new EventEmitter<PostCreatorData>();
  
  @ViewChild('textArea') textArea!: ElementRef<HTMLTextAreaElement>;

  newPostContent = '';
  selectedFiles: File[] = [];

  /**
   * Maneja el focus del textarea
   */
  onTextAreaFocus(): void {
    // Opcional: lógica adicional cuando se enfoca el textarea
  }

  /**
   * Maneja el blur del textarea
   */
  onTextAreaBlur(): void {
    // Opcional: lógica adicional cuando se desenfoca el textarea
  }

  /**
   * Enfoca el input de post (método para compatibilidad)
   */
  onPostInputFocus(): void {
    if (this.textArea) {
      this.textArea.nativeElement.focus();
    }
  }

  /**
   * Enfoca el input de post (método para compatibilidad)
   */
  focusPostInput(): void {
    if (this.textArea) {
      this.textArea.nativeElement.focus();
    }
  }

  /**
   * Maneja el blur del input de post (método para compatibilidad)
   */
  onPostInputBlur(): void {
    this.onTextAreaBlur();
  }

  /**
   * Envía el post
   */
  submitPost(): void {
    if (!this.newPostContent.trim()) return;

    const postData: PostCreatorData = {
      content: this.newPostContent.trim(),
      files: this.selectedFiles.length > 0 ? this.selectedFiles : undefined
    };

    this.postSubmitted.emit(postData);
    this.clearForm(); // Limpiar después de enviar
  }

  /**
   * Limpia el formulario
   */
  clearForm(): void {
    this.newPostContent = '';
    this.selectedFiles = [];
  }

  /**
   * Maneja la selección de archivos
   */
  onFileSelected(event: any): void {
    const files = event.target.files;
    if (files) {
      this.selectedFiles = Array.from(files);
    }
  }

  /**
   * Remueve un archivo seleccionado
   */
  removeFile(index: number): void {
    this.selectedFiles.splice(index, 1);
  }

  /**
   * Maneja opciones adicionales (photo, feeling, location)
   */
  onOptionClick(option: 'photo' | 'feeling' | 'location'): void {
    switch(option) {
      case 'photo':
        // Trigger file input click
        setTimeout(() => {
          const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
          if (fileInput) {
            fileInput.click();
          }
        }, 100);
        break;
      case 'feeling':
        // TODO: Implementar funcionalidad de sentimientos/actividades
        console.log('Feeling/Activity functionality not implemented yet');
        break;
      case 'location':
        // TODO: Implementar funcionalidad de ubicación
        console.log('Location functionality not implemented yet');
        break;
    }
  }
}
