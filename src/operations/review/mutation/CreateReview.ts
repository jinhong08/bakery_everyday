import { gql, MutationHookOptions, useMutation } from '@apollo/client';
import { ReactNativeFile } from 'apollo-upload-client';

import { Review } from '@/domain/review';
import { REVIEW_FRAGMENT_GQL } from '@/operations/review/fragment';

export type Data = Record<'createReview', Review>;

export interface Variable {
  productId: string;
  score: number;
  content: string;
  images: ReactNativeFile[];
}

export const CREATE_REVIEW_GQL = gql`
  ${REVIEW_FRAGMENT_GQL}
  mutation createReview(
    $productId: ID!
    $score: Float!
    $content: String!
    $images: [Upload!]!
  ) {
    createReview(
      request: {
        productId: $productId
        score: $score
        content: $content
        images: $images
      }
    ) {
      ...ReviewFragment
    }
  }
`;

export const CREATE_REVIEW = (options?: MutationHookOptions<Data, Variable>) =>
  useMutation<Data, Variable>(CREATE_REVIEW_GQL, {
    ...options,
  });
