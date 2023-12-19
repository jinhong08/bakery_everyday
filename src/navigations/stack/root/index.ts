import { StackScreenProps } from '@react-navigation/stack';

export enum RootNavigations {
  Auth = 'Auth',
  Main = 'Main',
}

export type RootStackParamList = {
  [RootNavigations.Auth]: undefined;
  [RootNavigations.Main]: undefined;
};

export type RootStackParamProps<T extends RootNavigations> = StackScreenProps<
  RootStackParamList,
  T
>;
