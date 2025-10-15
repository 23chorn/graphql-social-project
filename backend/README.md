# GraphQL Blog - Backend

Backend API for the GraphQL Blog application built with Apollo Server, GraphQL, MongoDB, Mongoose, and TypeScript.

## Project Structure

```
backend/
├── src/
│   ├── config/
│   │   └── database.ts       # MongoDB connection configuration
│   ├── models/
│   │   └── Post.ts          # Post Mongoose model with types
│   ├── resolvers/
│   │   └── index.ts         # GraphQL resolvers
│   ├── schema/
│   │   └── index.ts         # GraphQL type definitions
│   └── index.ts             # Main server file
├── dist/                     # Compiled JavaScript (generated)
├── .env                      # Environment variables
├── .gitignore
├── tsconfig.json             # TypeScript configuration
├── package.json
└── README.md
```

## Prerequisites

- Node.js (v16 or higher)
- MongoDB (running locally or remote instance)
- TypeScript knowledge (optional but recommended)

## Installation

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Configure your MongoDB connection in the `.env` file:
```env
MONGODB_URI=mongodb://localhost:27017/graphql-blog
PORT=4000
```

## Running the Server

Build the TypeScript code:
```bash
npm run build
```

Start the server (builds and runs):
```bash
npm start
```

For development with auto-reload and TypeScript compilation:
```bash
npm run dev
```

The GraphQL server will be available at `http://localhost:4000`

## GraphQL Schema

### Queries

- `posts`: Get all posts
- `post(id: ID!)`: Get a single post by ID
- `publishedPosts`: Get all published posts

### Mutations

- `createPost(title: String!, content: String!, author: String!)`: Create a new post
- `updatePost(id: ID!, title: String, content: String, published: Boolean)`: Update a post
- `deletePost(id: ID!)`: Delete a post

## Example Queries

### Create a Post
```graphql
mutation {
  createPost(
    title: "My First Post"
    content: "This is the content of my first post"
    author: "John Doe"
  ) {
    id
    title
    author
    createdAt
  }
}
```

### Get All Posts
```graphql
query {
  posts {
    id
    title
    author
    published
    createdAt
  }
}
```

### Update a Post
```graphql
mutation {
  updatePost(
    id: "your-post-id"
    published: true
  ) {
    id
    title
    published
  }
}
```

### Get Published Posts
```graphql
query {
  publishedPosts {
    id
    title
    content
    author
  }
}
```

## Technologies Used

- TypeScript - Type-safe JavaScript
- Apollo Server - GraphQL server
- GraphQL - Query language
- MongoDB - Database
- Mongoose - MongoDB object modeling with TypeScript support
- dotenv - Environment variable management
- ts-node-dev - TypeScript development server with auto-reload

## TypeScript Features

This project includes:
- Full type safety across models, resolvers, and configuration
- Interfaces for MongoDB documents (IPost)
- Typed resolver arguments
- Strict TypeScript compiler options
- Source maps for debugging
