import { gql } from '@apollo/client';

export const PROFILE_FRAGMENT_GQL = gql`
  fragment ProfileFragment on Member {
    id
    createdAt
    updatedAt
    name
    phone
    email
    postcode
    address1
    address2
    profileImageUrl
  }
`;
