import { CompositeScreenProps } from '@react-navigation/native';
import {
  StoreDetailNavigations,
  StoreDetailStackParamProps,
} from '@/navigations/stack/store';
import { MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs';

export enum ProductTopTabNavigation {
  Description = 'ProductTopTabDescription',
  Review = 'ProductTopTabReview',
}

export type ProductTopTabParamList = {
  [ProductTopTabNavigation.Description]: { productId: string };
  [ProductTopTabNavigation.Review]: { productId: string };
};

export type ProductTopTabParamProps<T extends ProductTopTabNavigation> =
  CompositeScreenProps<
    MaterialTopTabScreenProps<ProductTopTabParamList, T>,
    StoreDetailStackParamProps<StoreDetailNavigations.Product>
  >;
