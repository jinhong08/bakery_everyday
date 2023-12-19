import React from 'react';
import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { StarIcon } from 'react-native-heroicons/mini';

import {
  StoreNavigations,
  StoreStackParamList,
} from '@/navigations/stack/store/index';
import { stackNavigationOptions } from '@/constants/navigation.options';

import StoreHomeScreen, {
  StoreHomeScreenOptions,
} from '@/screens/store/StoreHomeScreen';
import StoreDetailStackNavigator, {
  StoreDetailStackNavigatorOptions,
} from '@/navigations/stack/store/StoreDetailStackNavigator';

export const StoreStackNavigatorOptions: BottomTabNavigationOptions = {
  tabBarIcon: ({ size, color }) => {
    return <StarIcon size={size} color={color} />;
  },
};

const Stack = createStackNavigator<StoreStackParamList>();

const StoreStackNavigator: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={stackNavigationOptions}>
      <Stack.Screen
        name={StoreNavigations.Home}
        component={StoreHomeScreen}
        options={StoreHomeScreenOptions}
      />
      <Stack.Screen
        name={StoreNavigations.Detail}
        component={StoreDetailStackNavigator}
        options={StoreDetailStackNavigatorOptions}
      />
    </Stack.Navigator>
  );
};

export default StoreStackNavigator;
