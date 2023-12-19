import { Store } from '@/domain/store';
import { gql, LazyQueryHookOptions, useLazyQuery } from '@apollo/client';

import { STORE_FRAGMENT_GQL } from '@/operations/store/fragment';

export type Data = Record<'store', Store>;

export interface Variable {
  storeId: string;
}

export const GET_STORE_GQL = gql`
  ${STORE_FRAGMENT_GQL}
  query store($storeId: ID!) {
    store(storeId: $storeId) {
      ...StoreFragment
    }
  }
`;

export const GET_STORE = (options?: LazyQueryHookOptions<Data, Variable>) =>
  useLazyQuery<Data, Variable>(GET_STORE_GQL, options);
