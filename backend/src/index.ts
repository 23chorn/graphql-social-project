import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import connectDB from './config/database';
import typeDefs from './schema';
import resolvers from './resolvers';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const startServer = async (): Promise<void> => {
  try {
    // Connect to MongoDB with error handling
    console.log('Connecting to MongoDB...');
    await connectDB();
    console.log('✓ Database connection established');

    // Create Apollo Server instance with schema and resolvers
    const server = new ApolloServer({
      typeDefs,
      resolvers,
      // Include stack trace in errors during development
      includeStacktraceInErrorResponses: process.env.NODE_ENV !== 'production',
    });

    // Get port from environment or use default
    const port = Number(process.env.PORT) || 4000;

    // Start the standalone server
    const { url } = await startStandaloneServer(server, {
      listen: { port },
    });

    console.log(`✓ Apollo Server ready at ${url}`);
    console.log(`✓ GraphQL endpoint: ${url}graphql`);
    console.log(`✓ Environment: ${process.env.NODE_ENV || 'development'}`);
  } catch (error) {
    console.error('✗ Failed to start server:', error);
    throw error;
  }
};

// Start the server with comprehensive error handling
startServer().catch((error) => {
  console.error('✗ Fatal error during server startup:', error);
  console.error('Server will shut down');
  process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT signal received: closing HTTP server');
  process.exit(0);
});
