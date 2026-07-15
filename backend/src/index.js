const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const typeDefs = require('./graphql/schema');
const resolvers = require('./graphql/resolvers');

async function startServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: process.env.PORT || 4000 },
    context: async ({ req }) => {
      // Stub auth context (will verify JWT here in real life)
      const authHeader = req.headers.authorization || '';
      if (authHeader.startsWith('Bearer mock-user-')) {
        return { user: { uid: authHeader.replace('Bearer ', '') } };
      }
      return { user: { uid: 'mock-user-123' } };
    },
  });
  console.log(`🚀 Server ready at ${url}`);
}

startServer();
