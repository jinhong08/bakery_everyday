import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import { CompositeScreenProps } from '@react-navigation/native';
import {
  MainBottomTabParamProps,
  MainNavigations,
} from '@/navigations/tab/main';

export enum StoreNavigations {
  Home = 'StoreHome',
  Detail = 'StoreDetail',
}

export type StoreStackParamList = {
  [StoreNavigations.Home]: undefined;
  [StoreNavigations.Detail]: { storeId: string };
};

export type StoreStackParamProps<T extends StoreNavigations> =
  CompositeScreenProps<
    StackScreenProps<StoreStackParamList, T>,
    MainBottomTabParamProps<MainNavigations.Store>
  >;

/* Store Detail */
export enum StoreDetailNavigations {
  Home = 'StoreDetailHome',
  PackageRegistration = 'StorePackageRegistration',
  Product = 'StoreProduct',
  ProductList = 'StoreProductList',
  Subscribe = 'StoreProductSubscribe',
  CreateReview = 'StoreCreateReview',
}

export type StoreDetailStackParamList = {
  [StoreDetailNavigations.Home]: { storeId: string };
  [StoreDetailNavigations.PackageRegistration]: { storeId: string };
  [StoreDetailNavigations.Product]: { productId: string };
  [StoreDetailNavigations.ProductList]: { storeId: string };
  [StoreDetailNavigations.Subscribe]: {
    productId: string;
    orderId: string;
    orderUrl: string;
    orderSecret: string;
  };
  [StoreDetailNavigations.CreateReview]: { productId: string };
};

export type StoreDetailStackParamProps<T extends StoreDetailNavigations> =
  CompositeScreenProps<
    StackScreenProps<StoreDetailStackParamList, T>,
    { navigation: StackNavigationProp<any> }
  >;
