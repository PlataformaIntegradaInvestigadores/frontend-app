import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-post-input',
  templateUrl: './post-input.component.html',
  styleUrls: ['./post-input.component.css']
})
export class PostInputComponent {
  @Input() user: any;
  @Output() postCreated = new EventEmitter<any>();
  newPost: { description: string, files: File[], created_at: string } = {
    description: '',
    files: [],
    created_at: new Date().toISOString()
  };
  filePreviews: any[] = [];
  showForm: boolean = false;

  addPost() {
    if (this.newPost.description || this.newPost.files.length > 0) {
      this.postCreated.emit(this.newPost);
      this.cancelPost();
    } else {
      console.log('Post description or file is required');
    }
  }

  cancelPost() {
    this.newPost = { description: '', files: [], created_at: new Date().toISOString() };
    this.filePreviews = [];
    this.showForm = false;
  }

  onFileSelected(event: any) {
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

  removeFile(index: number) {
    this.newPost.files.splice(index, 1);
    this.filePreviews.splice(index, 1);
  }
}
