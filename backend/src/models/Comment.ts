import mongoose, { Document, Schema } from 'mongoose';

export interface IComment extends Document {
  postId: mongoose.Types.ObjectId;
  authorId: mongoose.Types.ObjectId;
  text: string;
  createdAt: Date;
  updatedAt: Date;
}

const commentSchema = new Schema<IComment>({
  postId: {
    type: Schema.Types.ObjectId,
    ref: 'Post',
    required: [true, 'Post ID is required'],
    index: true,
  },
  authorId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Author ID is required'],
    index: true,
  },
  text: {
    type: String,
    required: [true, 'Comment text is required'],
    trim: true,
    minlength: [1, 'Comment cannot be empty'],
    maxlength: [1000, 'Comment cannot exceed 1000 characters'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
    index: true,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Compound index for queries fetching comments for a specific post
commentSchema.index({ postId: 1, createdAt: -1 });

// Index for fetching all comments by a user
commentSchema.index({ authorId: 1, createdAt: -1 });

// Update the updatedAt timestamp before saving
commentSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

// Update the updatedAt timestamp before updating
commentSchema.pre('findOneAndUpdate', function(next) {
  this.set({ updatedAt: new Date() });
  next();
});

export default mongoose.model<IComment>('Comment', commentSchema);
