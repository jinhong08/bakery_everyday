import { gql, LazyQueryHookOptions, useLazyQuery } from '@apollo/client';

import { Profile } from '@/domain/profile';
import { PROFILE_FRAGMENT_GQL } from '@/operations/profile/fragment';

export type Data = Record<'me', Profile>;

export interface Variables {}

export const GET_ME_GQL = gql`
  ${PROFILE_FRAGMENT_GQL}
  query me {
    me {
      ...ProfileFragment
    }
  }
`;

export const GET_ME = (options?: LazyQueryHookOptions<Data, Variables>) =>
  useLazyQuery<Data, Variables>(GET_ME_GQL, {
    ...options,
  });
