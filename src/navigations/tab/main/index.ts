import { CompositeScreenProps } from '@react-navigation/native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

import { RootNavigations, RootStackParamProps } from '@/navigations/stack/root';

export enum MainNavigations {
  Home = 'MainHome',
  Search = 'MainSearch',
  Store = 'MainStore',
  Profile = 'MainProfile',
}

export type MainBottomTabParamList = {
  [MainNavigations.Home]: undefined;
  [MainNavigations.Search]: undefined;
  [MainNavigations.Store]: undefined;
  [MainNavigations.Profile]: undefined;
};

export type MainBottomTabParamProps<T extends MainNavigations> =
  CompositeScreenProps<
    BottomTabScreenProps<MainBottomTabParamList, T>,
    RootStackParamProps<RootNavigations.Main>
  >;
