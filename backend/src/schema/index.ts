const typeDefs = `#graphql
  type User {
    id: ID!
    name: String!
    email: String!
    bio: String
    avatar: String
    createdAt: String!
    updatedAt: String!
  }

  type Post {
    id: ID!
    title: String!
    content: String!
    authorId: ID!
    author: User!
    tags: [String!]!
    published: Boolean!
    comments: [Comment!]!
    createdAt: String!
    updatedAt: String!
  }

  type Comment {
    id: ID!
    postId: ID!
    authorId: ID!
    author: User!
    text: String!
    createdAt: String!
    updatedAt: String!
  }

  type Query {
    # User queries
    user(id: ID!): User
    users: [User!]!

    # Post queries
    post(id: ID!): Post
    posts: [Post!]!
    publishedPosts: [Post!]!
    postsByUser(userId: ID!): [Post!]!
    postsByTag(tag: String!): [Post!]!

    # Comment queries
    comments(postId: ID!): [Comment!]!
    commentsByUser(userId: ID!): [Comment!]!
  }

  type Mutation {
    # User mutations
    createUser(name: String!, email: String!, bio: String, avatar: String): User!
    updateUser(id: ID!, name: String, email: String, bio: String, avatar: String): User
    deleteUser(id: ID!): Boolean!

    # Post mutations
    createPost(title: String!, content: String!, authorId: ID!, tags: [String!]): Post!
    updatePost(id: ID!, title: String, content: String, tags: [String!], published: Boolean): Post
    deletePost(id: ID!): Boolean!

    # Comment mutations
    createComment(postId: ID!, authorId: ID!, text: String!): Comment!
    updateComment(id: ID!, text: String!): Comment
    deleteComment(id: ID!): Boolean!
  }
`;

export default typeDefs;
