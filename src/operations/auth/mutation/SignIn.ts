import { gql, MutationHookOptions, useMutation } from '@apollo/client';

import { Token } from '@/domain/token';

export type Data = Record<'signIn', Token>;

export interface Variables {
  type: 'KAKAO' | 'NAVER';
  token: string;
}

export const SIGN_IN_GQL = gql`
  mutation signIn($type: AuthType!, $token: String!) {
    signIn(request: { type: $type, token: $token }) {
      accessToken
      refreshToken
    }
  }
`;

export const SIGN_IN = (options?: MutationHookOptions<Data, Variables>) =>
  useMutation<Data, Variables>(SIGN_IN_GQL, {
    ...options,
  });
