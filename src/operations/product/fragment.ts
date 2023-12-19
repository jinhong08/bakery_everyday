import { gql } from '@apollo/client';
import { STORE_FRAGMENT_GQL } from '@/operations/store/fragment';

export const PRODUCT_FRAGMENT_GQL = gql`
  ${STORE_FRAGMENT_GQL}
  fragment ProductFragment on Product {
    id
    createdAt
    updatedAt
    status
    store {
      ...StoreFragment
    }
    image {
      id
      url
    }
    name
    description {
      id
      url
    }
    breadType
    price
    quantity
    score
  }
`;
