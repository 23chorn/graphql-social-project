// Placeholder for shared TypeScript types
// Will contain interfaces for Posts, Users, etc.

export interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePostInput {
  title: string;
  content: string;
  author: string;
}

export interface UpdatePostInput {
  id: string;
  title?: string;
  content?: string;
  published?: boolean;
}
