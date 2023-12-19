import { gql, LazyQueryHookOptions, useLazyQuery } from '@apollo/client';
import { PRODUCT_FRAGMENT_GQL } from '@/operations/product/fragment';

import { BreadType, Product } from '@/domain/product';

export type Data = Record<'products', Product[]>;

export interface Variable {
  storeId?: string;
  breadType?: BreadType;
  saleOnly: boolean;
  page?: number;
  take?: number;
}

export const GET_PRODUCTS_GQL = gql`
  ${PRODUCT_FRAGMENT_GQL}
  query products(
    $storeId: ID
    $breadType: BreadType
    $saleOnly: Boolean
    $page: Int
    $take: Int
  ) {
    products(
      storeId: $storeId
      breadType: $breadType
      saleOnly: $saleOnly
      page: $page
      take: $take
    ) {
      ...ProductFragment
    }
  }
`;

export const GET_PRODUCTS = (options?: LazyQueryHookOptions<Data, Variable>) =>
  useLazyQuery<Data, Variable>(GET_PRODUCTS_GQL, {
    fetchPolicy: 'cache-and-network',
    ...options,
  });
