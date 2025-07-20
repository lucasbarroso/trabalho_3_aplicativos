export interface Post {
  id?: number;
  title: string;
  content: string;
  foto?: string;
  userId?: number;
  createdAt?: string;
}

export interface PostsResponse {
  posts: Post[];
  count: number;
}

export interface CreatePostRequest {
  title: string;
  content: string;
  foto: any; // File/FormData
} 