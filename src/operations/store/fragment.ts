import { gql } from '@apollo/client';

export const STORE_FRAGMENT_GQL = gql`
  fragment StoreFragment on Store {
    id
    createdAt
    updatedAt
    isManager
    name
    description
    location
    phone
    manager {
      id
      createdAt
      updatedAt
      nickname
    }
    image {
      id
      url
    }
  }
`;
