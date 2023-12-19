import { gql, MutationHookOptions, useMutation } from '@apollo/client';
import _ from 'lodash';

import { Order, OrderStatus } from '@/domain/order';
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

export type Data = Record<'cancel', Order>;

export interface Variables {
  orderId: string;
}

export const CANCEL_ORDER_GQL = gql`
  ${ORDER_FRAGMENT_GQL}
  mutation cancel($orderId: ID!) {
    cancel(orderId: $orderId) {
      ...OrderFragment
    }
  }
`;

export const CANCEL_ORDER = (options?: MutationHookOptions<Data, Variables>) =>
  useMutation<Data, Variables>(CANCEL_ORDER_GQL, {
    update: (cache, { data }) => {
      if (!data) return;

      cache.updateQuery<HasOrderData, HasOrderVariables>(
        {
          query: HAS_ORDER_GQL,
          variables: {
            productId: data?.cancel?.product?.id,
          },
        },
        () => ({
          hasOrder: false,
        })
      );

      cache.updateQuery<GetOrdersWithMemberData, GetOrdersWithVariables>(
        {
          query: GET_ORDERS_WITH_MEMBER_GQL,
          broadcast: true,
        },
        (prev) => ({
          ordersWithMember: _(prev.ordersWithMember)
            .map((order) =>
              order.id !== data?.cancel.id
                ? order
                : ({ ...order, status: OrderStatus.CANCEL } as Order)
            )
            .value(),
        })
      );
    },
    ...options,
  });
