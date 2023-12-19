import React from 'react';
import {
  createMaterialTopTabNavigator,
  MaterialTopTabNavigationOptions,
} from '@react-navigation/material-top-tabs';

import {
  ProductTopTabNavigation,
  ProductTopTabParamList,
} from '@/navigations/tab/product/index';

import { Colors } from '@/constants/color';

import StoreProductDescriptionScreen, {
  StoreProductDescriptionScreenOptions,
} from '@/screens/store/product/StoreProductDescriptionScreen';
import StoreProductReviewScreen, {
  StoreProductReviewScreenOptions,
} from '@/screens/store/product/StoreProductReviewScreen';

const Tab = createMaterialTopTabNavigator<ProductTopTabParamList>();

interface ProductTopTabNavigatorProps {
  productId: string;
}

const ProductTopTabNavigator: React.FC<ProductTopTabNavigatorProps> = ({
  productId,
}) => {
  return (
    <Tab.Navigator
      initialRouteName={ProductTopTabNavigation.Description}
      screenOptions={screenOptions}
    >
      <Tab.Screen
        name={ProductTopTabNavigation.Description}
        component={StoreProductDescriptionScreen}
        options={StoreProductDescriptionScreenOptions}
        initialParams={{ productId }}
      />
      <Tab.Screen
        name={ProductTopTabNavigation.Review}
        component={StoreProductReviewScreen}
        options={StoreProductReviewScreenOptions}
        initialParams={{ productId }}
      />
    </Tab.Navigator>
  );
};

const screenOptions: MaterialTopTabNavigationOptions = {
  tabBarActiveTintColor: Colors.black,
  tabBarInactiveTintColor: Colors.darkGray,
  tabBarLabelStyle: {
    fontWeight: '600',
    fontSize: 15,
  },
  tabBarIndicatorStyle: {
    backgroundColor: Colors.primary,
  },
};

export default ProductTopTabNavigator;
