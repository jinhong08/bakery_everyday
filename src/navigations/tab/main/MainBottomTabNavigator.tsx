import React, { useMemo } from 'react';
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { useReactiveVar } from '@apollo/client';

import { Colors } from '@/constants/color';
import { mainBottomNavigationVisibleVar } from '@/stores/common';
import {
  MainBottomTabParamList,
  MainNavigations,
} from '@/navigations/tab/main/index';

import HomeStackNavigator, {
  HomeStackNavigatorOptions,
} from '@/navigations/stack/home/HomeStackNavigator';
import SearchStackNavigator, {
  SearchStackNavigatorOptions,
} from '@/navigations/stack/search/SearchStackNavigator';
import StoreStackNavigator, {
  StoreStackNavigatorOptions,
} from '@/navigations/stack/store/StoreStackNavigator';
import ProfileStackNavigator, {
  ProfileStackNavigatorOptions,
} from '@/navigations/stack/profile/ProfileStackNavigator';

const Tab = createBottomTabNavigator<MainBottomTabParamList>();

const MainBottomTabNavigator: React.FC = () => {
  const mainBottomNavigationVisible = useReactiveVar<boolean>(
    mainBottomNavigationVisibleVar
  );

  const dynamicScreenOptions = useMemo<BottomTabNavigationOptions>(
    () => ({
      ...screenOptions,
      tabBarStyle: {
        display: mainBottomNavigationVisible ? 'flex' : 'none',
      },
    }),
    [mainBottomNavigationVisible]
  );

  return (
    <Tab.Navigator
      screenOptions={dynamicScreenOptions}
      initialRouteName={MainNavigations.Home}
    >
      <Tab.Screen
        name={MainNavigations.Home}
        component={HomeStackNavigator}
        options={HomeStackNavigatorOptions}
      />
      <Tab.Screen
        name={MainNavigations.Search}
        component={SearchStackNavigator}
        options={SearchStackNavigatorOptions}
      />
      <Tab.Screen
        name={MainNavigations.Store}
        component={StoreStackNavigator}
        options={StoreStackNavigatorOptions}
      />
      <Tab.Screen
        name={MainNavigations.Profile}
        component={ProfileStackNavigator}
        options={ProfileStackNavigatorOptions}
      />
    </Tab.Navigator>
  );
};

const screenOptions: BottomTabNavigationOptions = {
  headerShown: false,
  tabBarShowLabel: false,
  tabBarActiveTintColor: Colors.primary,
  tabBarInactiveTintColor: Colors.inactive,
};

export default MainBottomTabNavigator;
