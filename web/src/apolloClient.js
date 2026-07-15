import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { auth } from './firebase';

const httpLink = createHttpLink({
  uri: import.meta.env.VITE_GRAPHQL_URL || 'http://localhost:4000/', // Backend URL
});

const authLink = setContext(async (_, { headers }) => {
  // Get the authentication token from Firebase if it exists
  let token = auth.currentUser ? await auth.currentUser.getIdToken() : '';
  
  if (!token && auth.app.options.apiKey === 'mock-api-key') {
    token = localStorage.getItem('mockToken') || '';
  }
  
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});
