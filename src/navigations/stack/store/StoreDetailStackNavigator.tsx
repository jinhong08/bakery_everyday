import React from 'react';
import { useRoute } from '@react-navigation/native';
import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';

import {
  StoreDetailNavigations,
  StoreDetailStackParamList,
  StoreDetailStackParamProps,
} from '@/navigations/stack/store/index';
import { stackNavigationOptions } from '@/constants/navigation.options';

import StoreDetailHomeScreen, {
  StoreDetailHomeScreenOptions,
} from '@/screens/store/detail/StoreDetailHomeScreen';
import StoreProductRegistrationScreen, {
  StoreProductionRegistrationScreenOptions,
} from '@/screens/store/detail/StoreProductRegistrationScreen';
import StoreProductHomeScreen, {
  StoreProductHomeScreenOptions,
} from '@/screens/store/product/StoreProductHomeScreen';
import StoreProductListScreen, {
  StoreProductListScreenOptions,
} from '@/screens/store/detail/StoreProductListScreen';
import StoreProductSubscribeScreen, {
  StoreProductSubscribeScreenOptions,
} from '@/screens/store/subscribe/StoreProductSubscribeScreen';
import StoreCreateReviewScreen, {
  StoreCreateReviewScreenOptions,
} from '@/screens/store/review/StoreCreateReviewScreen';

type routeProp =
  StoreDetailStackParamProps<StoreDetailNavigations.Home>['route'];

export const StoreDetailStackNavigatorOptions: StackNavigationOptions = {
  headerShown: false,
};

const Stack = createStackNavigator<StoreDetailStackParamList>();

const StoreDetailStackNavigator: React.FC = () => {
  const route = useRoute<routeProp>();

  return (
    <Stack.Navigator
      initialRouteName={StoreDetailNavigations.Home}
      screenOptions={stackNavigationOptions}
    >
      <Stack.Screen
        name={StoreDetailNavigations.Home}
        component={StoreDetailHomeScreen}
        options={StoreDetailHomeScreenOptions}
        initialParams={{ storeId: route.params?.storeId ?? undefined }}
      />
      <Stack.Screen
        name={StoreDetailNavigations.PackageRegistration}
        component={StoreProductRegistrationScreen}
        options={StoreProductionRegistrationScreenOptions}
        initialParams={{ storeId: route.params?.storeId ?? undefined }}
      />
      <Stack.Screen
        name={StoreDetailNavigations.Product}
        component={StoreProductHomeScreen}
        options={StoreProductHomeScreenOptions}
      />
      <Stack.Screen
        name={StoreDetailNavigations.ProductList}
        component={StoreProductListScreen}
        options={StoreProductListScreenOptions}
        initialParams={{ storeId: route.params?.storeId ?? undefined }}
      />
      <Stack.Screen
        name={StoreDetailNavigations.Subscribe}
        component={StoreProductSubscribeScreen}
        options={StoreProductSubscribeScreenOptions}
      />
      <Stack.Screen
        name={StoreDetailNavigations.CreateReview}
        component={StoreCreateReviewScreen}
        options={StoreCreateReviewScreenOptions}
      />
    </Stack.Navigator>
  );
};

export default StoreDetailStackNavigator;
