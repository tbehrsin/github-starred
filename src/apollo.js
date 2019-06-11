import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';

const httpLink = createHttpLink({
  uri: 'https://api.github.com/graphql',
});

const accessToken = (() => {
  const name = 'accessToken=';
  const cookies = decodeURIComponent(document.cookie).split(';');
  for (const cookie of cookies) {
    if (cookie.indexOf(name) === 0) {
      return cookie.substring(name.length);
    }
  }
  return '';
})();

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: accessToken ? `Bearer ${accessToken}` : '',
    }
  }
});

export default new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
