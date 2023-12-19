import { gql, LazyQueryHookOptions, useLazyQuery } from '@apollo/client';

import { ORDER_FRAGMENT_GQL } from '@/operations/order/fragment';
import { Order } from '@/domain/order';

export type Data = Record<'ordersWithStore', Order[]>;

export interface Variables {
  storeId: string;
  page?: number;
  take?: number;
}

export const GET_ORDERS_WITH_STORE_GQL = gql`
  ${ORDER_FRAGMENT_GQL}
  query ordersWithStore($storeId: ID!, $page: Int, $take: Int) {
    ordersWithStore(storeId: $storeId, page: $page, take: $take) {
      ...OrderFragment
    }
  }
`;

export const GET_ORDERS_WITH_STORE = (
  options?: LazyQueryHookOptions<Data, Variables>
) => useLazyQuery<Data, Variables>(GET_ORDERS_WITH_STORE_GQL, { ...options });
