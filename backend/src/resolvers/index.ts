import { User, Post, Comment } from '../models';

// ============================================
// TypeScript Interfaces for Arguments
// ============================================

// User arguments
interface UserIdArgs {
  id: string;
}

interface CreateUserArgs {
  name: string;
  email: string;
  bio?: string;
  avatar?: string;
}

interface UpdateUserArgs {
  id: string;
  name?: string;
  email?: string;
  bio?: string;
  avatar?: string;
}

// Post arguments
interface PostIdArgs {
  id: string;
}

interface UserIdFilterArgs {
  userId: string;
}

interface TagFilterArgs {
  tag: string;
}

interface CreatePostArgs {
  title: string;
  content: string;
  authorId: string;
  tags?: string[];
}

interface UpdatePostArgs {
  id: string;
  title?: string;
  content?: string;
  tags?: string[];
  published?: boolean;
}

// Comment arguments
interface CommentIdArgs {
  id: string;
}

interface PostIdFilterArgs {
  postId: string;
}

interface CreateCommentArgs {
  postId: string;
  authorId: string;
  text: string;
}

interface UpdateCommentArgs {
  id: string;
  text: string;
}

// ============================================
// Resolvers
// ============================================

const resolvers = {
  Query: {
    // ==================== User Queries ====================
    user: async (_: unknown, { id }: UserIdArgs) => {
      try {
        return await User.findById(id);
      } catch (error) {
        throw new Error(`Error fetching user: ${(error as Error).message}`);
      }
    },

    users: async () => {
      try {
        return await User.find();
      } catch (error) {
        throw new Error(`Error fetching users: ${(error as Error).message}`);
      }
    },

    // ==================== Post Queries ====================
    post: async (_: unknown, { id }: PostIdArgs) => {
      try {
        return await Post.findById(id);
      } catch (error) {
        throw new Error(`Error fetching post: ${(error as Error).message}`);
      }
    },

    posts: async () => {
      try {
        return await Post.find().sort({ createdAt: -1 });
      } catch (error) {
        throw new Error(`Error fetching posts: ${(error as Error).message}`);
      }
    },

    publishedPosts: async () => {
      try {
        return await Post.find({ published: true }).sort({ createdAt: -1 });
      } catch (error) {
        throw new Error(`Error fetching published posts: ${(error as Error).message}`);
      }
    },

    postsByUser: async (_: unknown, { userId }: UserIdFilterArgs) => {
      try {
        return await Post.find({ authorId: userId }).sort({ createdAt: -1 });
      } catch (error) {
        throw new Error(`Error fetching posts by user: ${(error as Error).message}`);
      }
    },

    postsByTag: async (_: unknown, { tag }: TagFilterArgs) => {
      try {
        return await Post.find({ tags: tag.toLowerCase() }).sort({ createdAt: -1 });
      } catch (error) {
        throw new Error(`Error fetching posts by tag: ${(error as Error).message}`);
      }
    },

    // ==================== Comment Queries ====================
    comments: async (_: unknown, { postId }: PostIdFilterArgs) => {
      try {
        return await Comment.find({ postId }).sort({ createdAt: 1 });
      } catch (error) {
        throw new Error(`Error fetching comments: ${(error as Error).message}`);
      }
    },

    commentsByUser: async (_: unknown, { userId }: UserIdFilterArgs) => {
      try {
        return await Comment.find({ authorId: userId }).sort({ createdAt: -1 });
      } catch (error) {
        throw new Error(`Error fetching comments by user: ${(error as Error).message}`);
      }
    },
  },

  // ============================================
  // Nested Resolvers for Relationships
  // ============================================

  Post: {
    // Resolve the author relationship
    author: async (parent: any) => {
      try {
        return await User.findById(parent.authorId);
      } catch (error) {
        throw new Error(`Error fetching post author: ${(error as Error).message}`);
      }
    },

    // Resolve the comments relationship
    comments: async (parent: any) => {
      try {
        return await Comment.find({ postId: parent.id }).sort({ createdAt: 1 });
      } catch (error) {
        throw new Error(`Error fetching post comments: ${(error as Error).message}`);
      }
    },
  },

  Comment: {
    // Resolve the author relationship
    author: async (parent: any) => {
      try {
        return await User.findById(parent.authorId);
      } catch (error) {
        throw new Error(`Error fetching comment author: ${(error as Error).message}`);
      }
    },
  },

  // ============================================
  // Mutations
  // ============================================

  Mutation: {
    // ==================== User Mutations ====================
    createUser: async (_: unknown, { name, email, bio, avatar }: CreateUserArgs) => {
      try {
        const user = new User({
          name,
          email,
          bio,
          avatar,
        });
        return await user.save();
      } catch (error) {
        throw new Error(`Error creating user: ${(error as Error).message}`);
      }
    },

    updateUser: async (_: unknown, { id, name, email, bio, avatar }: UpdateUserArgs) => {
      try {
        const updateData: Partial<UpdateUserArgs> = {};
        if (name !== undefined) updateData.name = name;
        if (email !== undefined) updateData.email = email;
        if (bio !== undefined) updateData.bio = bio;
        if (avatar !== undefined) updateData.avatar = avatar;

        return await User.findByIdAndUpdate(
          id,
          updateData,
          { new: true, runValidators: true }
        );
      } catch (error) {
        throw new Error(`Error updating user: ${(error as Error).message}`);
      }
    },

    deleteUser: async (_: unknown, { id }: UserIdArgs) => {
      try {
        const result = await User.findByIdAndDelete(id);
        return result !== null;
      } catch (error) {
        throw new Error(`Error deleting user: ${(error as Error).message}`);
      }
    },

    // ==================== Post Mutations ====================
    createPost: async (_: unknown, { title, content, authorId, tags }: CreatePostArgs) => {
      try {
        const post = new Post({
          title,
          content,
          authorId,
          tags: tags || [],
        });
        return await post.save();
      } catch (error) {
        throw new Error(`Error creating post: ${(error as Error).message}`);
      }
    },

    updatePost: async (_: unknown, { id, title, content, tags, published }: UpdatePostArgs) => {
      try {
        const updateData: Partial<UpdatePostArgs> = {};
        if (title !== undefined) updateData.title = title;
        if (content !== undefined) updateData.content = content;
        if (tags !== undefined) updateData.tags = tags;
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

    deletePost: async (_: unknown, { id }: PostIdArgs) => {
      try {
        // Delete the post
        const result = await Post.findByIdAndDelete(id);

        // Also delete all comments associated with this post
        if (result) {
          await Comment.deleteMany({ postId: id });
        }

        return result !== null;
      } catch (error) {
        throw new Error(`Error deleting post: ${(error as Error).message}`);
      }
    },

    // ==================== Comment Mutations ====================
    createComment: async (_: unknown, { postId, authorId, text }: CreateCommentArgs) => {
      try {
        // Verify that the post exists
        const post = await Post.findById(postId);
        if (!post) {
          throw new Error('Post not found');
        }

        const comment = new Comment({
          postId,
          authorId,
          text,
        });
        return await comment.save();
      } catch (error) {
        throw new Error(`Error creating comment: ${(error as Error).message}`);
      }
    },

    updateComment: async (_: unknown, { id, text }: UpdateCommentArgs) => {
      try {
        return await Comment.findByIdAndUpdate(
          id,
          { text },
          { new: true, runValidators: true }
        );
      } catch (error) {
        throw new Error(`Error updating comment: ${(error as Error).message}`);
      }
    },

    deleteComment: async (_: unknown, { id }: CommentIdArgs) => {
      try {
        const result = await Comment.findByIdAndDelete(id);
        return result !== null;
      } catch (error) {
        throw new Error(`Error deleting comment: ${(error as Error).message}`);
      }
    },
  },
};

export default resolvers;
