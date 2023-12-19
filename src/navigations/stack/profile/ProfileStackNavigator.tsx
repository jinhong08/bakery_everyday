import React from 'react';
import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { UserCircleIcon } from 'react-native-heroicons/mini';

import {
  ProfileNavigations,
  ProfileStackParamList,
} from '@/navigations/stack/profile/index';
import { stackNavigationOptions } from '@/constants/navigation.options';

import ProfileHomeScreen, {
  ProfileHomeScreenOptions,
} from '@/screens/profile/ProfileHomeScreen';
import CreateStoreScreen, {
  CreateStoreScreenOptions,
} from '@/screens/profile/CreateStoreScreen';
import StoreDetailStackNavigator, {
  StoreDetailStackNavigatorOptions,
} from '@/navigations/stack/store/StoreDetailStackNavigator';
import ProfileSubscribedProductScreen, {
  ProfileSubscribedProductScreenOptions,
} from '@/screens/profile/ProfileSubscribedProductScreen';
import ProfileStoreOrderListScreen, {
  ProfileStoreOrderListScreenOptions,
} from '@/screens/profile/ProfileStoreOrderListScreen';

export const ProfileStackNavigatorOptions: BottomTabNavigationOptions = {
  tabBarIcon: ({ size, color }) => {
    return <UserCircleIcon size={size} color={color} />;
  },
};

const Stack = createStackNavigator<ProfileStackParamList>();

const ProfileStackNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName={ProfileNavigations.Home}
      screenOptions={stackNavigationOptions}
    >
      <Stack.Screen
        name={ProfileNavigations.Home}
        component={ProfileHomeScreen}
        options={ProfileHomeScreenOptions}
      />
      <Stack.Screen
        name={ProfileNavigations.CreateStore}
        component={CreateStoreScreen}
        options={CreateStoreScreenOptions}
      />
      <Stack.Screen
        name={ProfileNavigations.Store}
        component={StoreDetailStackNavigator}
        options={StoreDetailStackNavigatorOptions}
      />
      <Stack.Screen
        name={ProfileNavigations.SubscribedProduct}
        component={ProfileSubscribedProductScreen}
        options={ProfileSubscribedProductScreenOptions}
      />
      <Stack.Screen
        name={ProfileNavigations.StoreOrderList}
        component={ProfileStoreOrderListScreen}
        options={ProfileStoreOrderListScreenOptions}
      />
    </Stack.Navigator>
  );
};

export default ProfileStackNavigator;
