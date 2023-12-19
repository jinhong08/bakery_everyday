import { gql, LazyQueryHookOptions, useLazyQuery } from '@apollo/client';
import { PRODUCT_FRAGMENT_GQL } from '@/operations/product/fragment';

import { Product } from '@/domain/product';

export type Data = Record<'recommendedProducts', Product[]>;

export interface Variable {
  take?: number;
}

export const GET_RECOMMENDED_PRODUCTS_GQL = gql`
  ${PRODUCT_FRAGMENT_GQL}
  query recommendedProducts($take: Int) {
    recommendedProducts(take: $take) {
      ...ProductFragment
    }
  }
`;

export const GET_RECOMMENDED_PRODUCTS = (
  options?: LazyQueryHookOptions<Data, Variable>
) => useLazyQuery<Data, Variable>(GET_RECOMMENDED_PRODUCTS_GQL, { ...options });
