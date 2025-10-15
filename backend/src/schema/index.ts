const typeDefs = `#graphql
  type Post {
    id: ID!
    title: String!
    content: String!
    author: String!
    published: Boolean!
    createdAt: String!
    updatedAt: String!
  }

  type Query {
    posts: [Post!]!
    post(id: ID!): Post
    publishedPosts: [Post!]!
  }

  type Mutation {
    createPost(title: String!, content: String!, author: String!): Post!
    updatePost(id: ID!, title: String, content: String, published: Boolean): Post
    deletePost(id: ID!): Boolean!
  }
`;

export default typeDefs;
