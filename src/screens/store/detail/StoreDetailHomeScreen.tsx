import React, { useCallback, useEffect, useMemo } from 'react';
import {
  FlatList,
  ListRenderItem,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { StackNavigationOptions } from '@react-navigation/stack';
import { Feather, Ionicons } from '@expo/vector-icons';
import _ from 'lodash';

import {
  StoreDetailNavigations,
  StoreDetailStackParamProps,
} from '@/navigations/stack/store';

import { mainBottomNavigationVisibleVar } from '@/stores/common';
import { Colors } from '@/constants/color';
import { Store } from '@/domain/store';
import { GET_STORE } from '@/operations/store/query/GetStore';
import Conditional from '@/hocs/Conditional';
import { toPhoneNumber } from '@/utils/toPhoneNumber';
import CustomImage from '@/components/CustomImage';
import { GET_PRODUCTS } from '@/operations/product/query/GetProducts';
import { Product } from '@/domain/product';
import StoreDetailProductItem from '@/screens/store/detail/components/StoreDetailProductItem';

export const StoreDetailHomeScreenOptions: StackNavigationOptions = {
  title: '',
  headerStyle: {
    elevation: 0,
    shadowColor: 'transparent',
    backgroundColor: Colors.lightGray,
  },
};

interface StoreDetailHomeScreenProps {
  navigation: StoreDetailStackParamProps<StoreDetailNavigations.Home>['navigation'];
  route: StoreDetailStackParamProps<StoreDetailNavigations.Home>['route'];
}

const StoreDetailHomeScreen: React.FC<StoreDetailHomeScreenProps> = ({
  navigation,
  route,
}) => {
  useFocusEffect(() => {
    mainBottomNavigationVisibleVar(false);
  });

  const [getStore, { data: storeData }] = GET_STORE();
  const [getProduct, { data: productData, fetchMore }] = GET_PRODUCTS();

  const store = useMemo<Store | null>(
    () => storeData?.store ?? null,
    [storeData]
  );

  const productList = useMemo<Product[]>(
    () => productData?.products ?? [],
    [productData]
  );

  useEffect(() => {
    getStore({ variables: { storeId: route.params.storeId } });
    getProduct({
      variables: { storeId: route.params.storeId, saleOnly: true },
    });
  }, [route.params.storeId]);

  useEffect(() => {
    if (store !== null) {
      navigation.setOptions({
        title: store?.name,
      });
    }
  }, [store?.name]);

  const keyExtractor = useCallback((item: Product) => item.id, []);

  const renderItem = useCallback<ListRenderItem<Product>>(
    ({ item }) => <StoreDetailProductItem product={item} />,
    []
  );

  const onEndReached = useCallback(() => {
    if (productList.length % 10 === 0) {
      fetchMore({
        variables: {
          page: Math.floor(productList.length / 10) + 1,
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
  }, [productList.length]);

  return (
    <SafeAreaView style={styles.safeContainer}>
      <Conditional condition={store !== null}>
        <View style={styles.container}>
          <View style={styles.infoContainer}>
            <View style={styles.storeImageContainer}>
              <CustomImage
                style={styles.storeImage}
                width={126}
                height={126}
                imageUrl={store?.image?.url}
              />
            </View>

            <Text style={styles.description}>{store?.description}</Text>

            <Text style={styles.infoMessage}>
              <Ionicons
                name="ios-location-outline"
                size={16}
                color={Colors.primary}
              />
              {` ${store?.location}`}
            </Text>

            <Text style={styles.infoMessage}>
              <Feather name="phone" size={16} color={Colors.primary} />
              {` ${toPhoneNumber(store?.phone ?? '')}`}
            </Text>
          </View>

          <FlatList<Product>
            data={productList}
            keyExtractor={keyExtractor}
            renderItem={renderItem}
            onEndReachedThreshold={10}
            onEndReached={onEndReached}
            numColumns={2}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </Conditional>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  infoContainer: {
    padding: 20,
    backgroundColor: Colors.lightGray,
  },
  storeImageContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  storeImage: {
    borderRadius: 20,
  },
  description: {
    fontWeight: '600',
    fontSize: 16,
    color: Colors.black,
    marginBottom: 6,
    alignItems: 'center',
  },
  infoMessage: {
    fontWeight: '400',
    fontSize: 14,
    color: Colors.black,
    marginVertical: 2,
    alignItems: 'center',
  },
});

export default StoreDetailHomeScreen;
