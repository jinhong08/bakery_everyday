import { gql, LazyQueryHookOptions, useLazyQuery } from '@apollo/client';
import { PRODUCT_FRAGMENT_GQL } from '@/operations/product/fragment';

import { Product } from '@/domain/product';

export type Data = Record<'product', Product>;

export interface Variable {
  productId: string;
}

export const GET_PRODUCT_GQL = gql`
  ${PRODUCT_FRAGMENT_GQL}
  query product($productId: ID!) {
    product(productId: $productId) {
      ...ProductFragment
    }
  }
`;

export const GET_PRODUCT = (options?: LazyQueryHookOptions<Data, Variable>) =>
  useLazyQuery<Data, Variable>(GET_PRODUCT_GQL, { ...options });
