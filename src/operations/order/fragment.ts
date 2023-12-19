import { gql } from '@apollo/client';

import { PRODUCT_FRAGMENT_GQL } from '@/operations/product/fragment';
import { PROFILE_FRAGMENT_GQL } from '@/operations/profile/fragment';

export const ORDER_FRAGMENT_GQL = gql`
  ${PRODUCT_FRAGMENT_GQL}
  ${PROFILE_FRAGMENT_GQL}
  fragment OrderFragment on Order {
    id
    createdAt
    updatedAt
    paidAmount
    product {
      ...ProductFragment
    }
    member {
      ...ProfileFragment
    }
    status
  }
`;
