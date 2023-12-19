import { gql } from '@apollo/client';

import { PROFILE_FRAGMENT_GQL } from '@/operations/profile/fragment';
import { PRODUCT_FRAGMENT_GQL } from '@/operations/product/fragment';

export const REVIEW_FRAGMENT_GQL = gql`
  ${PROFILE_FRAGMENT_GQL}
  ${PRODUCT_FRAGMENT_GQL}
  fragment ReviewFragment on Review {
    id
    createdAt
    updatedAt
    member {
      ...ProfileFragment
    }
    product {
      ...ProductFragment
    }
    score
    content
    attachment {
      id
      url
    }
  }
`;
