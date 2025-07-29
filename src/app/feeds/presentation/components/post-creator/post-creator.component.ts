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
  @ViewChild('imageInput') imageInput!: ElementRef<HTMLInputElement>;
  @ViewChild('videoInput') videoInput!: ElementRef<HTMLInputElement>;
  @ViewChild('documentInput') documentInput!: ElementRef<HTMLInputElement>;

  newPostContent = '';
  selectedFiles: File[] = [];
  
  // Poll related properties
  showPollCreator = false;
  pollQuestion = '';
  pollOptions: string[] = ['', ''];

  /**
   * Verifica si la encuesta actual es válida
   */
  get isPollValid(): boolean {
    if (!this.showPollCreator) return true;
    
    const hasQuestion = this.pollQuestion.trim() !== '';
    const validOptions = this.pollOptions.filter(option => option.trim() !== '');
    
    return hasQuestion && validOptions.length >= 2;
  }

  /**
   * Obtiene el número de opciones válidas
   */
  get validPollOptionsCount(): number {
    return this.pollOptions.filter(option => option.trim() !== '').length;
  }

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
    if (!this.canSubmit()) return;

    // Validación específica para encuestas
    if (this.showPollCreator) {
      if (!this.pollQuestion.trim()) {
        alert('Por favor, escriba una pregunta para la encuesta.');
        return;
      }
      
      const validOptions = this.pollOptions.filter(option => option.trim() !== '');
      if (validOptions.length < 2) {
        alert('Por favor, proporcione al menos 2 opciones válidas para la encuesta.');
        return;
      }
    }

    // Generar contenido automático si hay encuesta sin contenido
    let content = this.newPostContent.trim();
    if (this.showPollCreator && !content) {
      content = this.pollQuestion.trim(); // Usar la pregunta como contenido
    }

    const postData: PostCreatorData = {
      content: content,
      files: this.selectedFiles.length > 0 ? this.selectedFiles : undefined,
      poll: this.showPollCreator ? {
        question: this.pollQuestion.trim(),
        options: this.pollOptions.filter(option => option.trim() !== '')
      } : undefined
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
    this.showPollCreator = false;
    this.pollQuestion = '';
    this.pollOptions = ['', ''];
    
    // Limpiar los inputs de archivo
    if (this.imageInput) this.imageInput.nativeElement.value = '';
    if (this.videoInput) this.videoInput.nativeElement.value = '';
    if (this.documentInput) this.documentInput.nativeElement.value = '';
  }

  /**
   * Maneja la selección de archivos
   */
  onFileSelected(event: any, type?: 'image' | 'video' | 'file'): void {
    const files = event.target.files;
    if (files) {
      // Agregar nuevos archivos a los existentes
      const newFiles = Array.from(files) as File[];
      this.selectedFiles = [...this.selectedFiles, ...newFiles];
      console.log('Archivos seleccionados:', newFiles.map(f => f.name));
    }
    
    // Limpiar el input para permitir seleccionar el mismo archivo de nuevo
    event.target.value = '';
  }

  /**
   * Remueve un archivo seleccionado
   */
  removeFile(index: number): void {
    this.selectedFiles.splice(index, 1);
  }

  /**
   * Maneja opciones adicionales (photo, video, file, poll)
   */
  onOptionClick(option: 'photo' | 'video' | 'file' | 'poll'): void {
    switch(option) {
      case 'photo':
        this.imageInput.nativeElement.click();
        break;
      case 'video':
        this.videoInput.nativeElement.click();
        break;
      case 'file':
        this.documentInput.nativeElement.click();
        break;
      case 'poll':
        this.showPollCreator = !this.showPollCreator;
        if (this.showPollCreator) {
          this.pollQuestion = '';
          this.pollOptions = ['', ''];
        }
        break;
    }
  }

  /**
   * Obtiene el ícono apropiado para el tipo de archivo
   */
  getFileIcon(file: File): string {
    const type = file.type.toLowerCase();
    const name = file.name.toLowerCase();
    
    if (type.startsWith('image/')) {
      return 'fas fa-image';
    } else if (type.startsWith('video/')) {
      return 'fas fa-video';
    } else if (type.includes('pdf') || name.endsWith('.pdf')) {
      return 'fas fa-file-pdf';
    } else if (type.includes('word') || name.endsWith('.doc') || name.endsWith('.docx')) {
      return 'fas fa-file-word';
    } else if (type.includes('excel') || name.endsWith('.xls') || name.endsWith('.xlsx')) {
      return 'fas fa-file-excel';
    } else if (type.includes('powerpoint') || name.endsWith('.ppt') || name.endsWith('.pptx')) {
      return 'fas fa-file-powerpoint';
    } else {
      return 'fas fa-file-alt';
    }
  }

  /**
   * Agrega una nueva opción a la encuesta
   */
  addPollOption(): void {
    if (this.pollOptions.length < 10) {
      this.pollOptions.push('');
      
      // Enfocar la nueva opción después de que se renderice
      setTimeout(() => {
        const newIndex = this.pollOptions.length - 1;
        const newInput = document.getElementById(`poll-option-${newIndex}`);
        if (newInput) {
          newInput.focus();
        }
      }, 0);
    }
  }

  /**
   * Remueve una opción de la encuesta
   */
  removePollOption(index: number): void {
    if (this.pollOptions.length > 2) {
      this.pollOptions.splice(index, 1);
    }
  }

  /**
   * Actualiza una opción específica de la encuesta
   * Este método ayuda a evitar problemas con el focus
   */
  updatePollOption(index: number, value: string): void {
    if (index >= 0 && index < this.pollOptions.length) {
      this.pollOptions[index] = value;
    }
  }

  /**
   * Maneja el evento de input en las opciones de encuesta
   */
  onPollOptionInput(event: Event, index: number): void {
    const target = event.target as HTMLInputElement;
    this.updatePollOption(index, target.value);
  }

  /**
   * Función de tracking para ngFor para evitar problemas con el focus
   */
  trackByIndex(index: number, item: any): number {
    return index;
  }

  /**
   * Cancela la creación de encuesta
   */
  cancelPoll(): void {
    this.showPollCreator = false;
    this.pollQuestion = '';
    this.pollOptions = ['', ''];
  }

  /**
   * Verifica si se puede enviar el post
   */
  canSubmit(): boolean {
    // Si no hay encuesta, debe tener contenido o archivos
    if (!this.showPollCreator) {
      return this.newPostContent.trim() !== '' || this.selectedFiles.length > 0;
    }
    
    // Si hay encuesta, debe ser válida (la encuesta puede existir sin contenido de texto)
    return this.isPollValid;
  }
}
