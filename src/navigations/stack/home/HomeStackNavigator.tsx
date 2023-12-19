import React from 'react';
import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeIcon } from 'react-native-heroicons/mini';

import {
  HomeNavigations,
  HomeStackParamList,
} from '@/navigations/stack/home/index';
import { stackNavigationOptions } from '@/constants/navigation.options';

import HomeScreen, { HomeScreenOptions } from '@/screens/home/HomeScreen';
import HomeCategoryScreen, {
  HomeCategoryScreenOptions,
} from '@/screens/home/HomeCategoryScreen';
import StoreDetailStackNavigator, {
  StoreDetailStackNavigatorOptions,
} from '@/navigations/stack/store/StoreDetailStackNavigator';
import StoreStackNavigator, {
  StoreStackNavigatorOptions,
} from '@/navigations/stack/store/StoreStackNavigator';
import HomeRecentStoreScreen, {
  HomeRecentStoreScreenOptions,
} from '@/screens/home/HomeRecentStoreScreen';

export const HomeStackNavigatorOptions: BottomTabNavigationOptions = {
  tabBarIcon: ({ size, color }) => {
    return <HomeIcon size={size} color={color} />;
  },
};

const Stack = createStackNavigator<HomeStackParamList>();

const HomeStackNavigator: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={stackNavigationOptions}>
      <Stack.Screen
        name={HomeNavigations.Home}
        component={HomeScreen}
        options={HomeScreenOptions}
      />
      <Stack.Screen
        name={HomeNavigations.Category}
        component={HomeCategoryScreen}
        options={HomeCategoryScreenOptions}
      />
      <Stack.Screen
        name={HomeNavigations.Store}
        component={StoreDetailStackNavigator}
        options={StoreDetailStackNavigatorOptions}
      />
      <Stack.Screen
        name={HomeNavigations.RecentStore}
        component={HomeRecentStoreScreen}
        options={HomeRecentStoreScreenOptions}
      />
    </Stack.Navigator>
  );
};

export default HomeStackNavigator;
