import { gql, MutationHookOptions, useMutation } from '@apollo/client';

export type Data = Record<'logout', boolean>;

export interface Variables {}

export const LOGOUT_GQL = gql`
  mutation logout {
    logout
  }
`;

export const LOGOUT = (options?: MutationHookOptions<Data, Variables>) =>
  useMutation<Data, Variables>(LOGOUT_GQL, {
    ...options,
  });
