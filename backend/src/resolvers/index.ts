import Post from '../models/Post';

interface CreatePostArgs {
  title: string;
  content: string;
  author: string;
}

interface UpdatePostArgs {
  id: string;
  title?: string;
  content?: string;
  published?: boolean;
}

interface PostIdArgs {
  id: string;
}

const resolvers = {
  Query: {
    // Get all posts
    posts: async () => {
      try {
        return await Post.find();
      } catch (error) {
        throw new Error(`Error fetching posts: ${(error as Error).message}`);
      }
    },

    // Get a single post by ID
    post: async (_: unknown, { id }: PostIdArgs) => {
      try {
        return await Post.findById(id);
      } catch (error) {
        throw new Error(`Error fetching post: ${(error as Error).message}`);
      }
    },

    // Get all published posts
    publishedPosts: async () => {
      try {
        return await Post.find({ published: true });
      } catch (error) {
        throw new Error(`Error fetching published posts: ${(error as Error).message}`);
      }
    },
  },

  Mutation: {
    // Create a new post
    createPost: async (_: unknown, { title, content, author }: CreatePostArgs) => {
      try {
        const post = new Post({
          title,
          content,
          author,
        });
        return await post.save();
      } catch (error) {
        throw new Error(`Error creating post: ${(error as Error).message}`);
      }
    },

    // Update an existing post
    updatePost: async (_: unknown, { id, title, content, published }: UpdatePostArgs) => {
      try {
        const updateData: Partial<UpdatePostArgs> = {};
        if (title !== undefined) updateData.title = title;
        if (content !== undefined) updateData.content = content;
        if (published !== undefined) updateData.published = published;

        return await Post.findByIdAndUpdate(
          id,
          updateData,
          { new: true, runValidators: true }
        );
      } catch (error) {
        throw new Error(`Error updating post: ${(error as Error).message}`);
      }
    },

    // Delete a post
    deletePost: async (_: unknown, { id }: PostIdArgs) => {
      try {
        const result = await Post.findByIdAndDelete(id);
        return result !== null;
      } catch (error) {
        throw new Error(`Error deleting post: ${(error as Error).message}`);
      }
    },
  },
};

export default resolvers;
