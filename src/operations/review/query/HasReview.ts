import { gql, LazyQueryHookOptions, useLazyQuery } from '@apollo/client';

export type Data = Record<'hasReview', boolean>;

export interface Variables {
  productId: string;
}

export const HAS_REVIEW_GQL = gql`
  query hasReview($productId: ID!) {
    hasReview(productId: $productId)
  }
`;

export const HAS_REVIEW = (options?: LazyQueryHookOptions<Data, Variables>) =>
  useLazyQuery<Data, Variables>(HAS_REVIEW_GQL, {
    ...options,
  });
