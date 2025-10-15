# GraphQL Social Platform

A full-stack social blogging platform built with GraphQL, TypeScript, React, and MongoDB.

## Project Structure

```
graphql-social-platform/
├── backend/                 # Apollo Server GraphQL API
│   ├── src/
│   │   ├── config/         # Database configuration
│   │   ├── models/         # Mongoose models
│   │   ├── resolvers/      # GraphQL resolvers
│   │   ├── schema/         # GraphQL type definitions
│   │   └── index.ts        # Server entry point
│   ├── dist/               # Compiled TypeScript
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/               # React frontend (to be configured)
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API services
│   │   ├── types/         # TypeScript types
│   │   ├── utils/         # Utility functions
│   │   └── styles/        # Styles
│   ├── package.json
│   └── tsconfig.json
│
└── README.md
```

## Tech Stack

### Backend
- TypeScript
- Node.js
- Apollo Server
- GraphQL
- MongoDB
- Mongoose
- dotenv

### Frontend (Planned)
- React
- TypeScript
- Apollo Client
- Vite
- Modern CSS/Styling solution

## Getting Started

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
Create a `.env` file in the backend directory:
```env
MONGODB_URI=mongodb://localhost:27017/graphql-blog
PORT=4000
```

4. Start the development server:
```bash
npm run dev
```

The GraphQL API will be available at `http://localhost:4000`

### Frontend Setup

The frontend is not yet configured. See `frontend/README.md` for future setup instructions.

## Features

### Current Features
- GraphQL API for blog posts
- CRUD operations for posts
- TypeScript type safety
- MongoDB integration

### Planned Features
- User authentication and authorization
- Comments on posts
- User profiles
- Social features (likes, follows)
- Rich text editor
- Image uploads
- Search functionality

## Development

### Backend Development
```bash
cd backend
npm run dev          # Start with auto-reload
npm run build        # Build TypeScript
npm start           # Build and run production
```

### Frontend Development
Coming soon...

## API Documentation

See `backend/README.md` for detailed GraphQL schema documentation and example queries.

## License

ISC
