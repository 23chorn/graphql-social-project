import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import connectDB from './config/database';
import typeDefs from './schema';
import resolvers from './resolvers';
import dotenv from 'dotenv';

dotenv.config();

const startServer = async (): Promise<void> => {
  // Connect to MongoDB
  await connectDB();

  // Create Apollo Server instance
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  // Start the server
  const { url } = await startStandaloneServer(server, {
    listen: { port: Number(process.env.PORT) || 4000 },
  });

  console.log(`Server ready at ${url}`);
};

startServer().catch((error) => {
  console.error('Error starting server:', error);
  process.exit(1);
});
