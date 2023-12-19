import { gql, LazyQueryHookOptions, useLazyQuery } from '@apollo/client';

import { ReviewList } from '@/domain/review';
import { REVIEW_FRAGMENT_GQL } from '@/operations/review/fragment';

export type Data = Record<'reviews', ReviewList>;

export interface Variables {
  productId: string;
  page?: number;
  take?: number;
}

export const GET_REVIEWS_GQL = gql`
  ${REVIEW_FRAGMENT_GQL}
  query reviews($productId: ID!, $page: Int, $take: Int) {
    reviews(productId: $productId, page: $page, take: $take) {
      content {
        ...ReviewFragment
      }
      totalElement
    }
  }
`;

export const GET_REVIEWS = (options?: LazyQueryHookOptions<Data, Variables>) =>
  useLazyQuery<Data, Variables>(GET_REVIEWS_GQL, {
    ...options,
  });
