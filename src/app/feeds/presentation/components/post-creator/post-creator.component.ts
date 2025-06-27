import { Component, Input, Output, EventEmitter } from '@angular/core';
import { PostCreatorData } from '../../types/post.types';

@Component({
  selector: 'app-post-creator',
  templateUrl: './post-creator.component.html',
  styleUrls: ['./post-creator.component.css']
})
export class PostCreatorComponent {
  @Input() placeholder: string = '¿Qué estás pensando? Comparte algo interesante...';
  @Input() buttonText: string = 'Publicar';
  @Input() showOptions: boolean = true;
  @Input() userAvatar: string = '/assets/profile.png';
  @Input() userName: string = '';
  @Input() isLoading: boolean = false;
  
  @Output() postSubmitted = new EventEmitter<PostCreatorData>();

  newPostContent = '';
  isPostInputFocused = false;
  selectedFiles: File[] = [];
  showFileInput = false;

  /**
   * Maneja el focus del input de post
   */
  onPostInputFocus(): void {
    this.isPostInputFocused = true;
  }

  /**
   * Maneja el blur del input de post
   */
  onPostInputBlur(): void {
    this.isPostInputFocused = false;
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
    this.showFileInput = false;
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
   * Maneja opciones adicionales (foto, link, encuesta)
   */
  onOptionClick(option: 'photo' | 'link' | 'poll'): void {
    switch(option) {
      case 'photo':
        this.showFileInput = true;
        // Trigger file input click
        setTimeout(() => {
          const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
          if (fileInput) {
            fileInput.click();
          }
        }, 100);
        break;
      case 'link':
        // TODO: Implementar funcionalidad de link
        console.log('Link functionality not implemented yet');
        break;
      case 'poll':
        // TODO: Implementar funcionalidad de encuesta
        console.log('Poll functionality not implemented yet');
        break;
    }
  }
}
