import { gql, MutationHookOptions, useMutation } from '@apollo/client';

import { Token } from '@/domain/token';

export type Data = Record<'reissue', Token>;

export interface Variables {
  accessToken: string;
  refreshToken: string;
}

export const REISSUE_GQL = gql`
  mutation reissue($accessToken: String!, $refreshToken: String!) {
    reissue(
      request: { accessToken: $accessToken, refreshToken: $refreshToken }
    ) {
      accessToken
      refreshToken
    }
  }
`;

export const REISSUE = (options?: MutationHookOptions<Data, Variables>) =>
  useMutation<Data, Variables>(REISSUE_GQL, {
    ...options,
  });
