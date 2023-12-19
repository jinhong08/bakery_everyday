import { gql, LazyQueryHookOptions, useLazyQuery } from '@apollo/client';

export type Data = Record<'hasOrder', boolean>;

export interface Variables {
  productId: string;
}

export const HAS_ORDER_GQL = gql`
  query hasOrder($productId: ID!) {
    hasOrder(productId: $productId)
  }
`;

export const HAS_ORDER = (options?: LazyQueryHookOptions<Data, Variables>) =>
  useLazyQuery<Data, Variables>(HAS_ORDER_GQL, { ...options });
