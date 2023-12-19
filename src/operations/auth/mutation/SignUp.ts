import { gql, MutationHookOptions, useMutation } from '@apollo/client';
import { ReactNativeFile } from 'apollo-upload-client';

import { Token } from '@/domain/token';

export type Data = Record<'signUp', Token>;

export interface Variables {
  type: 'KAKAO' | 'NAVER';
  token: string;
  name: string;
  email: string;
  phone: string;
  postcode: string;
  address1: string;
  address2: string;
  profileImage: ReactNativeFile;
}

export const SIGN_UP_GQL = gql`
  mutation signUp(
    $type: AuthType!
    $token: String!
    $name: String!
    $email: String!
    $phone: String!
    $postcode: String!
    $address1: String!
    $address2: String!
    $profileImage: Upload
  ) {
    signUp(
      request: {
        type: $type
        token: $token
        name: $name
        email: $email
        phone: $phone
        postcode: $postcode
        address1: $address1
        address2: $address2
        profileImage: $profileImage
      }
    ) {
      accessToken
      refreshToken
    }
  }
`;

export const SIGN_UP = (options?: MutationHookOptions<Data, Variables>) =>
  useMutation<Data, Variables>(SIGN_UP_GQL, {
    ...options,
  });
