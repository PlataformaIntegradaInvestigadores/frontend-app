import { Component, Input, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/profile/domain/entities/user.interfaces';

@Component({
  selector: 'app-post-input',
  templateUrl: './post-input.component.html',
  styleUrls: ['./post-input.component.css']
})
export class PostInputComponent {
  @Input() user!: User;
  @Output() postCreated = new EventEmitter<any>();
  newPost: { description: string, files: File[], created_at: string } = {
    description: '',
    files: [],
    created_at: new Date().toISOString()
  };
  filePreviews: any[] = [];
  showForm: boolean = false;

  /**
   * Añade una nueva publicación si tiene descripción o archivos adjuntos.
   */
  addPost(): void {
    if (this.newPost.description || this.newPost.files.length > 0) {
      this.postCreated.emit(this.newPost);
      this.cancelPost();
    } else {
    }
  }

  /**
   * Cancela la creación de una publicación y restablece los valores del formulario.
   */
  cancelPost(): void {
    this.newPost = { description: '', files: [], created_at: new Date().toISOString() };
    this.filePreviews = [];
    this.showForm = false;
  }

  /**
   * Maneja la selección de archivos y crea vistas previas de los mismos.
   * @param event - El evento de selección de archivos.
   */
  onFileSelected(event: any): void {
    const files: File[] = Array.from(event.target.files);
    this.newPost.files.push(...files);

    for (let file of files) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const fileType = file.type.split('/')[0];
        this.filePreviews.push({ type: fileType, url: e.target.result, name: file.name });
      };
      reader.readAsDataURL(file);
    }
  }

  /**
   * Elimina un archivo de la lista de archivos seleccionados.
   * @param index - El índice del archivo a eliminar.
   */
  removeFile(index: number): void {
    this.newPost.files.splice(index, 1);
    this.filePreviews.splice(index, 1);
  }
}
