import { Store } from '@/domain/store';
import { gql, LazyQueryHookOptions, useLazyQuery } from '@apollo/client';

import { STORE_FRAGMENT_GQL } from '@/operations/store/fragment';

export type Data = Record<'stores', Store[]>;

export interface Variable {
  page?: number;
  take?: number;
  search?: string;
}

export const GET_STORES_GQL = gql`
  ${STORE_FRAGMENT_GQL}
  query stores($page: Int, $take: Int, $search: String) {
    stores(page: $page, take: $take, search: $search) {
      ...StoreFragment
    }
  }
`;

export const GET_STORES = (options?: LazyQueryHookOptions<Data, Variable>) =>
  useLazyQuery<Data, Variable>(GET_STORES_GQL, {
    fetchPolicy: 'cache-and-network',
    ...options,
  });
