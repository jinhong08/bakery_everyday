import { StackScreenProps } from '@react-navigation/stack';
import { CompositeScreenProps } from '@react-navigation/native';

import { RootNavigations, RootStackParamProps } from '@/navigations/stack/root';

export enum AuthNavigations {
  Home = 'AuthHome',
  SignUp = 'AuthSignUp',
  KakaoLogin = 'AuthKakaoLogin',
}

export type AuthStackParamList = {
  [AuthNavigations.Home]: undefined;
  [AuthNavigations.SignUp]: { type: 'KAKAO' | 'NAVER'; token: string };
  [AuthNavigations.KakaoLogin]: undefined;
};

export type AuthStackParamProps<T extends AuthNavigations> =
  CompositeScreenProps<
    StackScreenProps<AuthStackParamList, T>,
    RootStackParamProps<RootNavigations.Auth>
  >;
