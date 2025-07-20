import { Post, PostsResponse } from '../types/posts';
import { api } from './api';

export const postsService = {
  async getPosts(page: number = 1, limit: number = 10): Promise<PostsResponse> {
    const response = await api.get<PostsResponse>('/posts', {
      params: { page, limit },
    });
    return response.data;
  },

  async getMyPosts(): Promise<Post[]> {
    const response = await api.get<Post[]>('/my-posts');
    return response.data;
  },

  async createPost(postData: FormData): Promise<Post> {
    const response = await api.post<Post>('/posts', postData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  async deletePost(postId: number): Promise<void> {
    await api.delete(`/posts/${postId}`);
  },
}; 