/**
 * Representa una publicación.
 */
export interface Post {
  id: string;
  description: string;
  files: PostFile[];
  created_at: string;
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
