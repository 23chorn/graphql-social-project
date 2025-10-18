// TypeScript interfaces matching backend models

export interface User {
  id: string;
  name: string;
  email: string;
  bio?: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  authorId: string;
  tags: string[];
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Comment {
  id: string;
  postId: string;
  authorId: string;
  text: string;
  createdAt: string;
  updatedAt: string;
}

// Input types for mutations
export interface CreateUserInput {
  name: string;
  email: string;
  bio?: string;
  avatar?: string;
}

export interface UpdateUserInput {
  id: string;
  name?: string;
  email?: string;
  bio?: string;
  avatar?: string;
}

export interface CreatePostInput {
  title: string;
  content: string;
  authorId: string;
  tags?: string[];
}

export interface UpdatePostInput {
  id: string;
  title?: string;
  content?: string;
  tags?: string[];
  published?: boolean;
}

export interface CreateCommentInput {
  postId: string;
  authorId: string;
  text: string;
}

export interface UpdateCommentInput {
  id: string;
  text: string;
}
