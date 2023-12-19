import { gql, MutationHookOptions, useMutation } from '@apollo/client';
import { ExtendedOrder } from '@/domain/order';
import { ORDER_FRAGMENT_GQL } from '@/operations/order/fragment';

export type Data = Record<'createOrder', ExtendedOrder>;

export interface Variables {
  productId: string;
}

export const CREATE_ORDER_GQL = gql`
  ${ORDER_FRAGMENT_GQL}
  mutation createOrder($productId: ID!) {
    createOrder(productId: $productId) {
      ...OrderFragment
      orderUrl
      orderSecret
    }
  }
`;

export const CREATE_ORDER = (options?: MutationHookOptions<Data, Variables>) =>
  useMutation<Data, Variables>(CREATE_ORDER_GQL, { ...options });
