/**
 * Representa una publicación.
 */
export interface Post {
  id: string;
  description: string;
  files: PostFile[];
  created_at: Date; // Cambio de string a Date
}

/**
 * Representa un archivo adjunto a una publicación.
 */
export interface PostFile {
  file: string;
}

/**
 * Representa la vista previa de un archivo.
 */
export interface FilePreview {
  type: string;
  url: string;
  name: string;
}
