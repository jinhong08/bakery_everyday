import { gql, MutationHookOptions, useMutation } from '@apollo/client';

import { Order } from '@/domain/order';
import { ORDER_FRAGMENT_GQL } from '@/operations/order/fragment';
import {
  Data as HasOrderData,
  HAS_ORDER_GQL,
  Variables as HasOrderVariables,
} from '@/operations/order/query/HasOrder';
import {
  Data as GetOrdersWithMemberData,
  GET_ORDERS_WITH_MEMBER_GQL,
  Variables as GetOrdersWithVariables,
} from '@/operations/order/query/GetOrdersWithMember';
import _ from 'lodash';

export type Data = Record<'success', Order>;

export interface Variables {
  orderId: string;
}

export const SUCCESS_ORDER_GQL = gql`
  ${ORDER_FRAGMENT_GQL}
  mutation success($orderId: ID!) {
    success(orderId: $orderId) {
      ...OrderFragment
    }
  }
`;

export const SUCCESS_ORDER = (options?: MutationHookOptions<Data, Variables>) =>
  useMutation<Data, Variables>(SUCCESS_ORDER_GQL, {
    update: (cache, { data }) => {
      if (!data) return;

      cache.updateQuery<HasOrderData, HasOrderVariables>(
        {
          query: HAS_ORDER_GQL,
          variables: {
            productId: data?.success?.product?.id,
          },
        },
        () => ({
          hasOrder: true,
        })
      );

      cache.updateQuery<GetOrdersWithMemberData, GetOrdersWithVariables>(
        {
          query: GET_ORDERS_WITH_MEMBER_GQL,
        },
        (prev) => ({
          ordersWithMember: _(prev.ordersWithMember)
            .unionBy([data.success], 'id')
            .orderBy((order) => order.createdAt, ['desc'])
            .value(),
        })
      );
    },
    ...options,
  });
