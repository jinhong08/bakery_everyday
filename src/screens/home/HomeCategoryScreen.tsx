import React, { useCallback, useEffect } from 'react';
import {
  FlatList,
  ListRenderItem,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import { CommonActions, useFocusEffect } from '@react-navigation/native';
import { StackNavigationOptions } from '@react-navigation/stack';

import { mainBottomNavigationVisibleVar } from '@/stores/common';
import { HomeNavigations, HomeStackParamProps } from '@/navigations/stack/home';
import { StoreDetailNavigations } from '@/navigations/stack/store';
import { getBreadTypeName, Product } from '@/domain/product';
import { GET_PRODUCTS } from '@/operations/product/query/GetProducts';
import ProductItem from '@/components/product/ProductItem';
import _ from 'lodash';

export const HomeCategoryScreenOptions: StackNavigationOptions = {};

interface HomeCategoryScreenProps {
  navigation: HomeStackParamProps<HomeNavigations.Category>['navigation'];
  route: HomeStackParamProps<HomeNavigations.Category>['route'];
}

const HomeCategoryScreen: React.FC<HomeCategoryScreenProps> = ({
  navigation,
  route,
}) => {
  useFocusEffect(() => {
    mainBottomNavigationVisibleVar(false);
  });

  useEffect(() => {
    navigation.setOptions({
      title: getBreadTypeName(route.params.breadType),
      headerStyle: {
        elevation: 1,
      },
    });
  }, [route.params.breadType]);

  const [getProducts, { data, fetchMore }] = GET_PRODUCTS();

  useEffect(() => {
    getProducts({
      variables: {
        breadType: route.params.breadType,
        saleOnly: true,
        page: 1,
        take: 10,
      },
    });
  }, [route.params.breadType]);

  const handleOnPress = useCallback(
    (product: Product) => {
      return () =>
        navigation.dispatch(
          CommonActions.navigate(HomeNavigations.Store, {
            initial: true,
            screen: StoreDetailNavigations.Product,
            params: {
              productId: product.id,
            },
          })
        );
    },
    [navigation]
  );

  const keyExtractor = useCallback((item: Product) => item.id, []);

  const renderItem = useCallback<ListRenderItem<Product>>(
    ({ item }) => <ProductItem product={item} onPress={handleOnPress(item)} />,
    [handleOnPress]
  );

  const onEndReached = useCallback(() => {
    if (data?.products?.length % 10 === 0) {
      fetchMore({
        variables: {
          breadType: route.params.breadType,
          page: Math.floor(data?.products?.length / 10) + 1,
          take: 10,
        },
        updateQuery: (prev, { fetchMoreResult }) => ({
          products: _(prev?.products ?? [])
            .unionBy(fetchMoreResult?.products, 'id')
            .orderBy((item) => item.createdAt, ['desc'])
            .value(),
        }),
      });
    }
  }, [data?.products?.length, route.params.breadType]);

  return (
    <SafeAreaView style={styles.safeContainer}>
      <FlatList
        data={data?.products ?? []}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        onEndReachedThreshold={10}
        onEndReached={onEndReached}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
  },
});

export default HomeCategoryScreen;
