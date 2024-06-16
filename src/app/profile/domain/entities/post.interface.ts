export interface Post {
  id: string;
  description: string;
  files: PostFile[];
  created_at: string;
}

export interface PostFile {
  file: string;
}

export interface FilePreview {
  type: string;
  url: string;
  name: string;
}
