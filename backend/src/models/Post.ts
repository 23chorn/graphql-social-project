import mongoose, { Document, Schema } from 'mongoose';

export interface IPost extends Document {
  title: string;
  content: string;
  authorId: mongoose.Types.ObjectId;
  tags: string[];
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const postSchema = new Schema<IPost>({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    minlength: [3, 'Title must be at least 3 characters long'],
    maxlength: [200, 'Title cannot exceed 200 characters'],
  },
  content: {
    type: String,
    required: [true, 'Content is required'],
    minlength: [10, 'Content must be at least 10 characters long'],
  },
  authorId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Author ID is required'],
    index: true,
  },
  tags: {
    type: [String],
    default: [],
    validate: {
      validator: function(tags: string[]) {
        return tags.length <= 10;
      },
      message: 'A post cannot have more than 10 tags',
    },
  },
  published: {
    type: Boolean,
    default: false,
    index: true,
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

// Compound index for queries filtering by author and published status
postSchema.index({ authorId: 1, published: 1 });

// Index for tag searches
postSchema.index({ tags: 1 });

// Update the updatedAt timestamp before saving
postSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

// Update the updatedAt timestamp before updating
postSchema.pre('findOneAndUpdate', function(next) {
  this.set({ updatedAt: new Date() });
  next();
});

// Trim and lowercase tags before saving
postSchema.pre('save', function(next) {
  if (this.tags && this.tags.length > 0) {
    this.tags = this.tags.map(tag => tag.trim().toLowerCase());
    // Remove duplicates
    this.tags = [...new Set(this.tags)];
  }
  next();
});

export default mongoose.model<IPost>('Post', postSchema);
