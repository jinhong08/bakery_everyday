import {
  ApolloClient,
  ApolloLink,
  createHttpLink,
  from,
  fromPromise,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { createUploadLink } from 'apollo-upload-client';

import cache from '@/client/cache';
import { BASE_URL } from '@/constants';
import { tokenVar } from '@/stores/auth';
import TokenRepository from '@/repository/token.repository';
import { REISSUE_GQL } from '@/operations/auth/mutation/ReIssue';

createHttpLink({
  uri: `${BASE_URL}/graphql`,
});

const authLink: ApolloLink = setContext(async (_, { headers }) => ({
  headers: tokenVar()?.accessToken
    ? { ...headers, Authorization: `Bearer ${tokenVar()?.accessToken}` }
    : headers,
}));

const errorLink: ApolloLink = onError(
  ({ graphQLErrors, operation, forward }) => {
    graphQLErrors?.forEach(({ message }) =>
      console.log(`[GraphQL Error] ${message}`)
    );

    if (graphQLErrors?.[0]?.extensions?.code === 'Unauthorized') {
      return fromPromise(
        client
          .mutate({ mutation: REISSUE_GQL, variables: tokenVar() })
          .then(({ data }) => {
            TokenRepository.set(data);
            tokenVar(data);
          })
          .catch(() => {
            TokenRepository.set(null);
            tokenVar(null);
          })
      ).flatMap(() => forward(operation));
    }
  }
);

const uploadLink: ApolloLink = createUploadLink({
  uri: `${BASE_URL}/graphql`,
});

const client = new ApolloClient({
  link: from([authLink, errorLink, uploadLink]),
  cache,
});

export default client;
