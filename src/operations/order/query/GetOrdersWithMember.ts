import { gql, LazyQueryHookOptions, useLazyQuery } from '@apollo/client';

import { ORDER_FRAGMENT_GQL } from '@/operations/order/fragment';
import { Order } from '@/domain/order';

export type Data = Record<'ordersWithMember', Order[]>;

export interface Variables {
  page?: number;
  take?: number;
}

export const GET_ORDERS_WITH_MEMBER_GQL = gql`
  ${ORDER_FRAGMENT_GQL}
  query ordersWithMember($page: Int, $take: Int) {
    ordersWithMember(page: $page, take: $take) {
      ...OrderFragment
    }
  }
`;

export const GET_ORDERS_WITH_MEMBER = (
  options?: LazyQueryHookOptions<Data, Variables>
) => useLazyQuery<Data, Variables>(GET_ORDERS_WITH_MEMBER_GQL, { ...options });
