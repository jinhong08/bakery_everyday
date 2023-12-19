import { gql, LazyQueryHookOptions, useLazyQuery } from '@apollo/client';
import { PRODUCT_FRAGMENT_GQL } from '@/operations/product/fragment';

import { Product } from '@/domain/product';

export type Data = Record<'productsRanking', Product[]>;

export interface Variable {
  page?: number;
  take?: number;
}

export const GET_PRODUCTS_RANKING_GQL = gql`
  ${PRODUCT_FRAGMENT_GQL}
  query productsRanking($page: Int, $take: Int) {
    productsRanking(page: $page, take: $take) {
      ...ProductFragment
    }
  }
`;

export const GET_PRODUCTS_RANKING = (
  options?: LazyQueryHookOptions<Data, Variable>
) =>
  useLazyQuery<Data, Variable>(GET_PRODUCTS_RANKING_GQL, {
    fetchPolicy: 'cache-and-network',
    ...options,
  });
